import { Link } from 'react-router-dom';
import Header from '../../components/header/header';
import styles from './not-found.module.css';

const NotFound = (): JSX.Element => (
  <div className="container">
    <Header />
    <div className={styles.wrapper}>
      <span className={styles.icon}>😕</span>
      <h1 className={styles.heading}>Oops, this page doesn't exists</h1>
      <Link className={styles.link} to="/">Go to main page</Link>
    </div>
  </div>
);

export default NotFound;
