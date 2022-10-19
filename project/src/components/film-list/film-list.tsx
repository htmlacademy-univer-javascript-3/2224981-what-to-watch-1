import FilmInfo from '../../types/film-info';
import FilmCard from '../film-card/film-card';
import {useState} from 'react';
import CategoryTabs from '../category-tabs/category-tabs';
import {toGenreDict} from '../../utils/film-manager';
import {ALL_GENRES_KEY} from '../../const/simple-const';

type FilmListProps = {
  films: FilmInfo[],
  showGenres: boolean
}

function FilmList(props: FilmListProps) {
  const [/*activeFilmCardId*/, setActiveFilmCardId] = useState(-1);
  const [shownFilms, setShownFilms] = useState(props.films);

  const genreDict = toGenreDict(props.films);
  const tabs = Object.keys(genreDict);

  const changeTab = (tab: string) => {
    if (tab === ALL_GENRES_KEY) {
      setShownFilms(props.films);
    } else {
      setShownFilms(genreDict[tab]);
    }
  };

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      {props.showGenres && <CategoryTabs tabs={tabs} onChangeTab={changeTab}/>}

      <div className="catalog__films-list">
        {shownFilms.map((item) => <FilmCard key={item.id} filmInfo={item} onMouseEnterHandler={() => {setActiveFilmCardId(item.id);}} onMouseLeaveHandler={() => {setActiveFilmCardId(-1);}}/>)}
      </div>

      <div className="catalog__more">
        <button className="catalog__button" type="button">Show more</button>
      </div>
    </section>
  );
}

export default FilmList;
