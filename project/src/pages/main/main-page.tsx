import FilmList from '../../components/film-list/film-list';
import Header, {HeaderClass} from '../../components/header/header';
import {Footer} from '../../components/footer/footer';
import {useAppSelector} from '../../hooks/store-hooks';
import FilmHeader from '../../components/film-header/film-header';

function MainPage(): JSX.Element {
  const films = useAppSelector((state) => state.filmsSlice.films);
  const filmPromo = films[0];

  const favorites = useAppSelector((state) => state.filmsSlice.favorites);

  if (!filmPromo) {
    return (
      <div>{null}</div>
    );
  }

  return (
    <div>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={filmPromo.previewImage} alt="The Grand Budapest Hotel" />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header showAvatar headerClass={HeaderClass.FilmCard}/>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={filmPromo.posterImage} alt="The Grand Budapest Hotel poster" width="218" height="327" />
            </div>

            <FilmHeader film={filmPromo} favorites={favorites}/>
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
