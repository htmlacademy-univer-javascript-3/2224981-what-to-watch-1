import {Fragment} from 'react';
import FilmInfo from '../../types/film-info';
import FilmList from '../../components/film-list/film-list';
import {Link, useParams} from 'react-router-dom';
import AppRoutes from '../../const/app-routes';
import FilmHeader from '../../components/film-header/film-header';
import Page404 from '../../components/page-404/page-404';
import TabManager from '../../components/film-tabs/tab-manager/tab-manager';
import {findById, findByGenre} from '../../utils/film-manager';

type FilmPageProps = {
  films: FilmInfo[];
}

function FilmPage(props: FilmPageProps): JSX.Element {
  const {id} = useParams();
  const film = findById(props.films, Number(id));

  if (film === undefined) {
    return <Page404/>;
  }

  const recommendedFilms = findByGenre(props.films, film.genre, film.id);

  return (
    <Fragment>

      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film.previewImage}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <div className="logo">
              <a className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <ul className="user-block">
              <li className="user-block__item">
                <div className="user-block__avatar">
                  <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
                </div>
              </li>
              <li className="user-block__item">
                <a className="user-block__link">Sign out</a>
              </li>
            </ul>
          </header>

          <FilmHeader film={film}/>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={film.posterImage} width="218" height="327"/>
            </div>

            <div className="film-card__desc">
              <TabManager film={film}/>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <FilmList films={recommendedFilms} showGenres={false}/>
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
    </Fragment>
  );
}

export default FilmPage;
