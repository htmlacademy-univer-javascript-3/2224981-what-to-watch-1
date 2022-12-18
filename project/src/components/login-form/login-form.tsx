import {FormEvent, useEffect, useRef, useState} from 'react';
import {loginAction} from '../../store/api-actions/api-actions';
import {INVALID_EMAIL_ERROR, INVALID_PASSWORD} from '../../const/login-errors';
import {useAppDispatch, useAppSelector} from '../../hooks/store-hooks';
import {setError} from '../../store/slices/app-slice/app-slice';
import {useNavigate} from 'react-router-dom';
import AuthStatus from '../../const/auth-status';

export function LoginForm() {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const [formError, setFormError] = useState('');
  const globalError = useAppSelector((state) => state.appSlice.error);
  const status = useAppSelector((state) => state.userSlice.auth);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    if (status === AuthStatus.Auth) {
      dispatch(setError(''));
      navigate(-1);
    }

    if (mounted) {
      dispatch(setError(''));
    }

    return () => {
      mounted = false;
    };
  }, [dispatch, status]);


  const checkEmail = () => {
    if (!emailRef.current?.validity.valid) {
      setFormError(INVALID_EMAIL_ERROR);
      return false;
    }
    return true;
  };

  const checkPassword = () => {
    if (passwordRef.current?.validity.patternMismatch ||
    !passwordRef.current?.value) {
      setFormError(INVALID_PASSWORD);
      return false;
    }
    return true;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (emailRef.current && passwordRef.current) {

      if (checkEmail() && checkPassword()) {
        dispatch(loginAction({
          email: emailRef.current?.value,
          password: passwordRef.current?.value
        }));
      }
    }
  };

  return (
    <form action="#" className="sign-in__form" onSubmit={handleSubmit}>
      <div className="sign-in__message">
        <p>{formError || globalError}</p>
      </div>
      <div className="sign-in__fields">
        <div className="sign-in__field sign-in__field--error">
          <input className="sign-in__input" type="email" placeholder="Email address" name="user-email"
            id="user-email" ref={emailRef}
          />
          <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
        </div>
        <div className="sign-in__field">
          <input className="sign-in__input" type="password" placeholder="Password" name="user-password"
            id="user-password" ref={passwordRef} pattern={'^[A-Za-z].*[0-9]|[0-9].*[A-Za-z]$'}
          />
          <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
        </div>
      </div>
      <div className="sign-in__submit">
        <button className="sign-in__btn" type="submit">Sign in</button>
      </div>
    </form>
  );
}
