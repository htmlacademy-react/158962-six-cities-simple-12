import { Link } from 'react-router-dom';
import styles from './not-found.module.css';

const NotFound = (): JSX.Element => (
  <div className="container">
    <div className={styles.wrapper}>
      <span className={styles.icon}>😕</span>
      <h1 className={styles.heading}>Oops, this page does not exists</h1>
      <Link className={styles.link} to="/">Go to main page</Link>
    </div>
  </div>
);

export default NotFound;
