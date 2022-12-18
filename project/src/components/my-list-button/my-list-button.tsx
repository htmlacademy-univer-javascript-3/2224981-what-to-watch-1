import {useEffect, useState} from 'react';
import FilmInfo from '../../types/film-info';
import {dispatch} from '../../store';
import {changeFavoriteStatus, getFavorite} from '../../store/api-actions/api-actions';
import {useAppSelector} from '../../hooks/store-hooks';
import AuthStatus from '../../const/auth-status';
import {useNavigate} from 'react-router-dom';
import AppRoutes from '../../const/app-routes';

type MyListButtonProps = {
  film: FilmInfo
}

export function MyListButton({film}: MyListButtonProps) {
  const auth = useAppSelector((state) => state.userSlice.auth);
  const favorites = useAppSelector((state) => state.filmsSlice.favorites);

  const [selected, setSelected] = useState(film.isFavorite);
  const [disabled, setDisabled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      dispatch(getFavorite());
      setSelected(film.isFavorite);
    }

    return () => {
      mounted = false;
    };
  }, [film]);

  const toggleFilm = () => {
    if (auth !== AuthStatus.Auth) {
      navigate(`/${AppRoutes.Login}`);
      return;
    }

    const newStatus = Number(!selected);
    const newSelected = !selected;

    setDisabled(true);
    dispatch(changeFavoriteStatus({id: film.id, status: newStatus}))
      .then(() => {
        setSelected(newSelected);
        setDisabled(false);
      }, () => {
        setDisabled(false);
      });
  };

  return (
    <button className="btn btn--list film-card__button" type="button" onClick={toggleFilm} disabled={disabled}>
      <svg viewBox="0 0 19 20" width="19" height="20">
        {!selected && <use xlinkHref="#add"></use>}
        {selected && <use xlinkHref="#in-list"></use>}
      </svg>
      <span>My list</span>
      <span className="film-card__count">{favorites.length}</span>
    </button>
  );
}
