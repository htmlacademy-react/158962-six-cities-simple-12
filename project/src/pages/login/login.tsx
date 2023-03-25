import styles from './login.module.css';
import Layout from '../../components/layout/layout';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../../hooks';
import {AuthData, loginAction, setLogin} from '../../store/slices/user-slice';
import { AppRoute, EMAIL_REGEXP, PASSWORD_REGEXP } from '../../const';
import {ChangeEvent, FormEvent, useState} from 'react';

const Login = (): JSX.Element => {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const dispatch = useAppDispatch();

  const isEmailValid = (value: string) => EMAIL_REGEXP.test(value);
  const isPasswordValid = (value: string) => PASSWORD_REGEXP.test(value)

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>, value: string) => {
    dispatch(setLogin(value))
    setEmailValue(value);
    !isEmailValid(value) ?
      e.target.style.borderColor = 'red' :
      e.target.style.borderColor = '';
  }

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>, value: string) => {
    setPasswordValue(value);
    !isPasswordValid(value) ?
      e.target.style.borderColor = 'red' :
      e.target.style.borderColor = '';
  }

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (isPasswordValid(passwordValue) && isEmailValid(emailValue)) {
      onSubmit({
        login: emailValue,
        password: passwordValue,
      });
    }
  };


  return (
    <Layout className="page--gray page--login">
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action=""
              onSubmit={handleSubmit}
              method="post">
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                {
                  !isEmailValid(emailValue) &&
                  <div className={styles.error}>Email is incorrect</div>
                }
                <input className="login__input form__input"
                       type="email"
                       name="email"
                       value={emailValue}
                       onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                         onEmailChange(evt, evt.target.value);
                       } }
                       placeholder="Email"
                       required />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                {
                  !isPasswordValid(passwordValue)
                  && <div className={styles.error}>Password should contain al least 1 letter and 1 number</div>
                }
                <input className="login__input form__input"
                       type="password"
                       value={passwordValue}
                       onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                         onPasswordChange(evt, evt.target.value)
                       } }
                       name="password"
                       placeholder="Password"
                       required
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  )
};

export default Login;
