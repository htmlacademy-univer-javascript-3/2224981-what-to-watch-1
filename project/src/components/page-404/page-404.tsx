import './page-404.css';
import Header, {HeaderClass} from '../header/header';

function Page404(): JSX.Element {
  return (
    <div className="user-page">
      <Header showAvatar headerClass={HeaderClass.UserPage}/>

      <div className={'parent'}>
        <h1>404</h1>
        <div>No found</div>
      </div>
    </div>
  );
}

export default Page404;
