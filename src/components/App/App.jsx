import React, { useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  HashRouter as Router,
  Route,
  Link,
  useHistory,
} from 'react-router-dom';

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  // const feedBackList = useSelector((store) => store.feedbackList);
  const feedbackSchema = useSelector((store) => store.feedbackSchema);

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

  const navigateToNextPage = () => {
    // navigate('/');
    console.log('history', history);
    history.push('/');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Feedback!</h1>
        <h4>Don't forget it!</h4>
      </header>
      <Router>
        <div className="feedback-container">
          {feedbackSchema.map((item, index) => {
            return (
              <Route exact path={`/${item.route}`}>
                <h1>{item.header}</h1>

                <form>
                  <div className="feedback-input">
                    <p className="feedback-topic">{item.topic}</p>
                    <input type="text" />
                    <br />

                    <Link to={feedbackSchema[index + 1]?.route}>
                      <button>Next</button>
                    </Link>
                  </div>
                </form>
              </Route>
            );
          })}
        </div>
      </Router>
    </div>
  );
}

export default App;
