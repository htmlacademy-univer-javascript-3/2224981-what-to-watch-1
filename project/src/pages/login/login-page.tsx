import Header, {HeaderClass} from '../../components/header/header';
import {Footer} from '../../components/footer/footer';
import {LoginForm} from '../../components/login-form/login-form';

function LoginPage(): JSX.Element {
  return (
    <div className="user-page">
      <Header showAvatar={false} headerClass={HeaderClass.UserPage}>
        <h1 className="page-title user-page__title">Sign in</h1>
      </Header>

      <div className="sign-in user-page__content">
        <LoginForm/>
      </div>

      <Footer/>
    </div>
  );
}

export default LoginPage;
