import FilmList from '../../components/film-list/film-list';
import Header, {HeaderClass} from '../../components/header/header';
import {Footer} from '../../components/footer/footer';
import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/store-hooks';
import {getFavorite} from '../../store/api-actions';
import Spinner from '../../components/spinner/spinner';

function MyListPage(): JSX.Element {
  const [loading, setLoading] = useState(true);
  const favoriteFilms = useAppSelector((state) => state.filmsSlice.favorites);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      dispatch(getFavorite())
        .then(() => {setLoading(false);});
    }

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <Spinner/>
    );
  }

  return (
    <div className="user-page">
      <Header showAvatar headerClass={HeaderClass.UserPage}>
        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{favoriteFilms.length}</span></h1>
      </Header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <FilmList films={favoriteFilms} showGenres={false}/>
      </section>

      <Footer/>
    </div>
  );
}

export default MyListPage;
