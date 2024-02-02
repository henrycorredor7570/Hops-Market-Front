import Spinner from 'react-bootstrap/Spinner';
import style from "./Loading.module.css"

function Loading() {
  return (
    <Spinner animation="border" role="status" className={style.loading}>
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}

export default Loading;