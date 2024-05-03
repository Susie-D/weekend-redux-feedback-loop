import React, { useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const feedBackList = useSelector((store) => store.feedbackList);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = () => {
    axios({
      method: 'GET',
      url: 'api/',
    })
      .then((response) => {
        dispatch({
          type: 'SET_PIZZAS',
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log('You had a axios GET error', error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Feedback!</h1>
        <h4>Don't forget it!</h4>
      </header>
      <div className="feedback-container">
        <form onSubmit={() => feeling()}>
          <h1>How are you feeling today?</h1>
          <p> Feeling?</p>
          <div className="feedback-input">
            <input type="number" />
            <br />
            <button>Next</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
