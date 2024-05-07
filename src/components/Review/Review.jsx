import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Review({ feedbackSchema }) {
  const history = useHistory();
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
    <>
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
    </>
  );
}

export default Review;
