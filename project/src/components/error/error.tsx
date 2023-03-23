import styles from '../error/error.module.css';

const Error = (): JSX.Element => (
  <div className={styles.wrapper}>
    <div>
      <h2>Ups, error</h2>
      <p>Here is something wrong</p>
    </div>
  </div>
);

export default Error;
