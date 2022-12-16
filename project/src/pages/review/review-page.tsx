import {Link, useParams} from 'react-router-dom';
import AppRoutes from '../../const/app-routes';
import ReviewCommentForm from '../../components/review-comment-form/review-comment-form';
import Header, {HeaderClass} from '../../components/header/header';
import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/store-hooks';
import Spinner from '../../components/spinner/spinner';
import Page404 from '../../components/page-404/page-404';
import {setFilm} from '../../store/slices/film-slice/film-slice';
import {getFilmById} from '../../store/api-actions/api-actions';

function ReviewPage(): JSX.Element {
  const id = Number(useParams().id);
  const film = useAppSelector((state) => state.filmsSlice.film);

  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      dispatch(getFilmById(id))
        .then(() => {setLoading(false);});
    }

    return () => {
      mounted = false;
      dispatch(setFilm(null));
    };
  }, [dispatch, id]);

  if (loading) {
    return <Spinner/>;
  }

  if (!film) {
    return <Page404/>;
  }

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.previewImage} alt={film.name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header showAvatar headerClass={HeaderClass.Empty}>
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={AppRoutes.FilmsRoot + film.id} className="breadcrumbs__link">{film.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>
        </Header>

        <div className="film-card__poster film-card__poster--small">
          <img src={film.posterImage} alt={film.name} width="218"
            height="327"
          />
        </div>
      </div>

      <ReviewCommentForm film={film}/>

    </section>
  );
}

export default ReviewPage;
