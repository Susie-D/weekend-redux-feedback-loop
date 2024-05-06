import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { Route, useHistory, Link } from 'react-router-dom';

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
    setInputValue('');
  };

  const handleSubmitPost = (review) => {
    console.log('hey, review', review);
    axios({
      method: 'POST',
      url: 'api/feedback',
      data: review.map((item) => item.value),
      // data: review.reduce((accum, item) => {
      //   return {
      //     ...accum,
      //     [item.key]: item.value,
      //   };
      // }, {}),
    })
      .then((response) => {
        history.push(`/thanks`);
      })
      .catch((error) => {
        console.log('Adding review submit error:', error);
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
            <Route exact path={`/`}>
              <h1>{item.header}</h1>
              <div className="feedback-input">
                <p className="feedback-topic">{item.topic}</p>
                <input
                  type="text"
                  data-testid="input"
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                />
                <br />
                <button
                  type="submit"
                  data-testid="next"
                  onClick={() => handleSubmit(item.key, index)}
                >
                  Next
                </button>
              </div>
            </Route>
          </div>
        );
      })}
      <Route exact path={`/review`}>
        <h1>Review Your Feedback</h1>
        <div className="feedback-review-container">
          <div className="feedback-review-content">
            {feedbackSchema.map((feedback) => {
              return (
                <p className="feedback-text" key={feedback.key}>
                  {feedback.key}: {feedback.value}
                </p>
              );
            })}
            <button
              data-testid="next"
              type="submit"
              onClick={() => handleSubmitPost([...feedbackSchema])}
            >
              Submit
            </button>
          </div>
        </div>
      </Route>
      <Route exact path={`/thanks`}>
        <h1>Thank you for your feedback!</h1>
        <div className="feedback-review-container">
          <div className="feedback-review-content">
            <h2 className="thank-you-text">
              Please feel free to submit another one at your leisure.
            </h2>

            <Link to={'/'}>
              <button type="button" data-testid="next">
                Leave New Feedback
              </button>
            </Link>
          </div>
        </div>
      </Route>
    </div>
  );
}

export default App;
