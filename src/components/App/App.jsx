import React, { useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { Route} from 'react-router-dom';
import Feedback from '../Feedback/Feedback';
import Review from '../Review/Review';
import Thanks from '../Thanks/Thanks';

function App() {
  const feedbackSchema = useSelector((store) => store.feedbackSchema);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = () => {
    axios({
      method: 'GET',
      url: 'api/feedback',
    })
      .then((response) => {
        console.log('GET', response.data);
        dispatch({
          type: 'SET_FEEDBACK',
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
      {feedbackSchema.map((item, index) => {
        return (
          <div key={item.key} className="feedback-container">
            <Route exact path={`/${item.route}`}>
              <Feedback
                feedbackSchema={feedbackSchema}
                item={item}
                index={index}
              />
            </Route>
          </div>
        );
      })}
      <Route exact path={`/review`}>
        <Review feedbackSchema={feedbackSchema} />
      </Route>
      <Route exact path={`/thanks`}>
        <Thanks />
      </Route>
    </div>
  );
}

export default App;
