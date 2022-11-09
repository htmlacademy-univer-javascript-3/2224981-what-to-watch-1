import {Fragment, useEffect, useState} from 'react';
import FilmList from '../../components/film-list/film-list';
import {useParams} from 'react-router-dom';
import FilmHeader from '../../components/film-header/film-header';
import TabManager from '../../components/film-tabs/tab-manager/tab-manager';
import Header, {HeaderClass} from '../../components/header/header';
import {Footer} from '../../components/footer/footer';
import {useAppSelector} from '../../hooks/store-hooks';
import {getFullFilmInfo} from '../../store/api-actions';
import {setComments, setFilm, setFilmsByGenre} from '../../store/slices/film-slice';
import Spinner from '../../components/spinner/spinner';
import {dispatch} from '../../store';
import Page404 from '../../components/page-404/page-404';

function FilmPage(): JSX.Element {
  const id = Number(useParams().id);
  const film = useAppSelector((state) => state.filmsSlice.film);
  const recommendedFilms = useAppSelector((state) => state.filmsSlice.oneGenreFilms);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      dispatch(getFullFilmInfo(id))
        .then(() => {setLoading(false);});
    }

    return () => {
      mounted = false;
      dispatch(setFilm(null));
      dispatch(setFilmsByGenre([]));
      dispatch(setComments([]));
    };
  }, [id]);

  if (loading) {
    return <Spinner/>;
  }

  if (!film) {
    return <Page404/>;
  }

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

          <FilmList films={recommendedFilms.filter((item) => item.id !== film.id)} showGenres={false}/>
        </section>

        <Footer/>
      </div>
    </Fragment>
  );
}

export default FilmPage;
