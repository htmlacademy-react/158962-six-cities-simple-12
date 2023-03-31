import styles from './login.module.css';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { EMAIL_REGEXP, PASSWORD_REGEXP, LOGIN_FIELDS } from '../../const';
import { AuthData, loginAction } from '../../store/slices/user-slice';
import cn from 'classnames';

type Field = {
  value: string;
  regex: RegExp;
  error: boolean;
  errorText: string;
}

const LoginForm = () => {
  const [formData, setFormData] = useState<Record<string, Field>>({
    email: {
      value: '',
      error: false,
      regex: EMAIL_REGEXP,
      errorText: 'Email is incorrect'
    },
    password: {
      value: '',
      error: false,
      regex: PASSWORD_REGEXP,
      errorText: 'Password should contain at least 1 letter and 1 number'
    },
  });

  const dispatch = useAppDispatch();

  const isFieldsGroupValid = Object.values(formData)
    .some((value) => value.error);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: {
        ...formData[name],
        error: !formData[name].regex.test(value),
        value: value,
      }
    });
  };

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onSubmit({
      login: formData.email.value,
      password: formData.password.value,
    });
  };

  return (
    <form
      className="login__form form"
      action=""
      onSubmit={handleSubmit}
      method="post"
    >

      {
        Object.entries(LOGIN_FIELDS).map(([name, label]) => (
          <div key={name} className="login__input-wrapper form__input-wrapper">
            <label className="visually-hidden">{label}</label>
            <div className={styles.error}>
              {formData[name].error && (
                <div className={styles.error}>{formData[name].errorText}</div>
              )}
            </div>
            <input className={cn('login__input form__input', { [styles.inputError]: formData[name].error })}
              type={name}
              name={name}
              value={formData[name].value}
              onChange={handleInputChange}
              placeholder={label}
              required
            />
          </div>
        ))
      }

      <button
        className="login__submit form__submit button"
        disabled={isFieldsGroupValid}
        type="submit"
      >Sign in
      </button>
    </form>
  );
};

export default LoginForm;
