import FilmList from '../../components/film-list/film-list';
import Header, {HeaderClass} from '../../components/header/header';
import {Footer} from '../../components/footer/footer';
import {useAppSelector} from '../../hooks/store-hooks';

function MainPage(): JSX.Element {
  const films = useAppSelector((state) => state.filmsSlice.films);
  const filmPromo = films[0];

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

            <div className="film-card__desc">
              <h2 className="film-card__title">{filmPromo.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{filmPromo.genre}</span>
                <span className="film-card__year">{filmPromo.released}</span>
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
              </div>
            </div>
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
