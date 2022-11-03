import {Fragment} from 'react';
import FilmInfo from '../../types/film-info';
import FilmList from '../../components/film-list/film-list';
import {useParams} from 'react-router-dom';
import FilmHeader from '../../components/film-header/film-header';
import Page404 from '../../components/page-404/page-404';
import TabManager from '../../components/film-tabs/tab-manager/tab-manager';
import {findByGenre, findById} from '../../utils/film-manager';
import Header, {HeaderClass} from '../../components/header/header';
import {Footer} from '../../components/footer/footer';

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

          <Header showAvatar headerClass={HeaderClass.FilmCard}/>

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

        <Footer/>
      </div>
    </Fragment>
  );
}

export default FilmPage;
