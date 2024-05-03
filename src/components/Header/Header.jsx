import HeaderItem from '../HeaderItem/HeaderItem';
import { useSelector } from 'react-redux';

function Header() {
  const feedback = useSelector((store) => store.feedbackHeader);
  const topics = useSelector((store) => store.feedbackTopic);

  return (
    <>
      {/* {feedback.map((header) => {
        return (
          <div>
            <h1>{header}</h1>
          </div>
        );
      })} */}
    </>
  );
}

export default Header;
