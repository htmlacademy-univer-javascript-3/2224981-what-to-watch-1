import {useEffect, useState} from 'react';
import FilmInfo from '../../types/film-info';
import {dispatch} from '../../store';
import {changeFavoriteStatus} from '../../store/api-actions';
import {useAppSelector} from '../../hooks/store-hooks';
import AuthStatus from '../../const/auth-status';
import {useNavigate} from 'react-router-dom';
import AppRoutes from '../../const/app-routes';

type MyListButtonProps = {
  favoriteNumber: number,
  film: FilmInfo
}

export function MyListButton({favoriteNumber, film}: MyListButtonProps) {
  const auth = useAppSelector((state) => state.userSlice.auth);

  const [amount, setAmount] = useState(favoriteNumber);
  const [selected, setSelected] = useState(film.isFavorite);
  const [disabled, setDisabled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setAmount(favoriteNumber);
      setSelected(film.isFavorite);
    }

    return () => {
      mounted = false;
    };
  }, [favoriteNumber, film]);

  const toggleFilm = () => {
    const newStatus = Number(!selected);
    const newSelected = !selected;
    const summand = selected ? -1 : 1;

    setDisabled(true);
    dispatch(changeFavoriteStatus({id: film.id, status: newStatus}))
      .then(() => {
        setSelected(newSelected);
        setAmount(amount + summand);
        setDisabled(false);
      }, () => {
        setDisabled(false);
      });
  };

  if (auth !== AuthStatus.Auth) {
    navigate(`/${AppRoutes.Login}`);
  }

  return (
    <button className="btn btn--list film-card__button" type="button" onClick={toggleFilm} disabled={disabled}>
      <svg viewBox="0 0 19 20" width="19" height="20">
        {!selected && <use xlinkHref="#add"></use>}
        {selected && <use xlinkHref="#in-list"></use>}
      </svg>
      <span>My list</span>
      <span className="film-card__count">{amount}</span>
    </button>
  );
}
