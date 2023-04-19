import { fetchOffers } from '../../store/slices/offer-slice/offer-slice';
import { useAppDispatch } from '../../hooks';
import styles from './page-error.module.css';

const FullPageError = ():JSX.Element => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <p className={styles.errorText}>Ups, something went wrong and we cannot get offers</p>
        <button onClick={() => {dispatch(fetchOffers());}}
          className={styles.retry}
          type="button"
        >
          Try again
        </button>
      </div>

    </div>
  );
};

export default FullPageError;
