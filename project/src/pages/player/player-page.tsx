import {VideoPlayer} from '../../components/video-player/video-player';
import {useAppDispatch, useAppSelector} from '../../hooks/store-hooks';
import Page404 from '../../components/page-404/page-404';
import {useEffect, useState} from 'react';
import Spinner from '../../components/spinner/spinner';
import {setFilm} from '../../store/slices/film-slice/film-slice';
import {getFilmById} from '../../store/api-actions';
import {useParams} from 'react-router-dom';

function PlayerPage(): JSX.Element {
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
  }, [id, dispatch]);


  if (loading) {
    return <Spinner/>;
  }

  if (!film) {
    return <Page404/>;
  }

  return (
    <VideoPlayer film={film}/>
  );
}

export default PlayerPage;
