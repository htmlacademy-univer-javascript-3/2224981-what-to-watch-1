import './page-404.css';
import Header, {HeaderClass} from '../header/header';
import {Link} from 'react-router-dom';

function Page404(): JSX.Element {
  return (
    <div className="user-page">
      <Header showAvatar headerClass={HeaderClass.UserPage}/>

      <div className={'parent'}>
        <h1>404</h1>
        <div>Not found</div>
        <div style={{marginTop: '80px'}}>
          <Link to={'/'}>
            Go to Main page
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Page404;
