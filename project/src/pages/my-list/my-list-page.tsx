import FilmList from '../../components/film-list/film-list';
import FilmInfo from '../../types/film-info';
import {Link} from 'react-router-dom';
import AppRoutes from '../../const/app-routes';
import Header from '../../components/header/header';

type MyListPageProps = {
  films: FilmInfo[];
}

function MyListPage(props: MyListPageProps): JSX.Element {
  return (
    <div className="user-page">
      <Header/>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <FilmList films={props.films} showGenres/>
      </section>

      <footer className="page-footer">
        <div className="logo">
          <Link to={AppRoutes.Root} className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}

export default MyListPage;
