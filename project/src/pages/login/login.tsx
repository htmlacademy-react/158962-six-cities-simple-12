import Layout from '../../components/layout/layout';
import LoginForm from '../../components/login-form/login-form';
import { Link } from 'react-router-dom';
import { AppRoute, CITIES } from '../../const';
import { getRandomElementFromArray } from '../../utils/utils';
import {useAppDispatch} from '../../hooks';
import { changeCity } from '../../store/slices/offer-slice/offer-slice';

const Login = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const randomCity = getRandomElementFromArray(CITIES);

  return (
    <Layout className="page--gray page--login">
      <main className="page__main page__main--login" data-testid="login-page">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <LoginForm />
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link"
                onClick={() => dispatch(changeCity(randomCity))}
                to={AppRoute.Root}
              >
                <span data-testid="location-text">{randomCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
};

export default Login;
