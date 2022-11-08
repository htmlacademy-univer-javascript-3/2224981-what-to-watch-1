import {Link} from 'react-router-dom';
import AppRoutes from '../../const/app-routes';
import FilmInfo from '../../types/film-info';
import {useAppSelector} from '../../hooks/store-hooks';
import AuthStatus from '../../const/auth-status';

type FilmHeaderProps = {
  film: FilmInfo;
}

function FilmHeader({film}: FilmHeaderProps) {
  const auth = useAppSelector((state) => state.userSlice.auth);

  return (
    <div className="film-card__wrap">
      <div className="film-card__desc">
        <h2 className="film-card__title">{film?.name}</h2>
        <p className="film-card__meta">
          <span className="film-card__genre">{film?.genre}</span>
          <span className="film-card__year">{film?.released}</span>
        </p>

        <div className="film-card__buttons">
          <button className="btn btn--play film-card__button" type="button">
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref="#play-s"></use>
            </svg>
            <span>Play</span>
          </button>
          <button className="btn btn--list film-card__button" type="button">
            <svg viewBox="0 0 19 20" width="19" height="20">
              <use xlinkHref="#add"></use>
            </svg>
            <span>My list</span>
            <span className="film-card__count">9</span>
          </button>
          {auth === AuthStatus.Auth && <Link to={AppRoutes.FilmsReview} className="btn film-card__button">Add review</Link>}
        </div>
      </div>
    </div>
  );
}

export default FilmHeader;
