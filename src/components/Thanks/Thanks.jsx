import { Link } from 'react-router-dom';

function Thanks() {
  return (
    <>
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
    </>
  );
}

export default Thanks;
