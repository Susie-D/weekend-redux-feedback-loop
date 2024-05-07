import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function Feedback({ item, index, feedbackSchema }) {
  const [inputValue, setInputValue] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();

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
  return (
    <>
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
    </>
  );
}

export default Feedback;
