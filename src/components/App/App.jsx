import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';

function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  const feedbackSchema = useSelector((store) => store.feedbackSchema);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = () => {
    axios({
      method: 'GET',
      url: 'api/feedback',
    })
      .then((response) => {
        dispatch({
          type: 'SET_FEEDBACK',
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log('You had a axios GET error', error);
      });
  };

  const handleSubmit = (item, index) => {
    console.log(item, inputValue);
    dispatch({
      type: 'SET_VALUE',
      payload: [item, inputValue],
    });
    history.push(
      feedbackSchema[index + 1]?.route
        ? `/${feedbackSchema[index + 1]?.route}`
        : '/review'
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Feedback!</h1>
        <h4>Don't forget it!</h4>
      </header>
      {feedbackSchema.map((item, index) => {
        return (
          <div key={item.key} className="feedback-container">
            <Route exact path={`/${item.route}`}>
              <h1>{item.header}</h1>
              <form>
                <div className="feedback-input">
                  <p className="feedback-topic">{item.topic}</p>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                  />
                  <br />
                  <button
                    type="button"
                    onClick={() => handleSubmit(item.key, index)}
                  >
                    Next
                  </button>
                </div>
              </form>
            </Route>
          </div>
        );
      })}
      <Route exact path={`/review`}>
        <h1>Review Your Feedback</h1>
        {feedbackSchema.map((feedback) => {
          return (
            <p key={feedback.key}>
              {feedback.key}: {feedback.value}
            </p>
          );
        })}
      </Route>
    </div>
  );
}

export default App;
