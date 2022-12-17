import FilmList from '../../components/film-list/film-list';
import Header, {HeaderClass} from '../../components/header/header';
import {Footer} from '../../components/footer/footer';
import {useAppDispatch, useAppSelector} from '../../hooks/store-hooks';
import FilmHeader from '../../components/film-header/film-header';
import {useEffect} from 'react';
import {getPromo} from '../../store/api-actions/get-promo';

function MainPage(): JSX.Element {
  const films = useAppSelector((state) => state.filmsSlice.films);
  const filmPromo = useAppSelector((state) => state.filmsSlice.promo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      dispatch(getPromo());
    }

    return () => {
      mounted = false;
    };
  }, []);


  if (!filmPromo) {
    return (
      <div>{null}</div>
    );
  }

  return (
    <div>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={filmPromo.previewImage} alt={filmPromo.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header showAvatar headerClass={HeaderClass.FilmCard}/>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={filmPromo.posterImage} alt={filmPromo.name} width="218" height="327" />
            </div>

            <FilmHeader film={filmPromo}/>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <FilmList films={films} showGenres></FilmList>
        </section>

        <Footer/>
      </div>
    </div>
  );
}

export default MainPage;
