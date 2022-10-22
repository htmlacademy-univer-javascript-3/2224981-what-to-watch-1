import FilmInfo from '../../types/film-info';
import FilmCard from '../film-card/film-card';
import {Fragment, useState} from 'react';
import CategoryTabs from '../category-tabs/category-tabs';
import {toGenreDict} from '../../utils/film-manager';
import {ALL_GENRES_KEY, NEXT_LOADING_CARDS_AMOUNT} from '../../const/simple-const';
import ShowMoreButton from '../show-more-button/show-more-button';

type FilmListProps = {
  films: FilmInfo[],
  showGenres: boolean
}

function FilmList(props: FilmListProps) {
  const [/*activeFilmCardId*/, setActiveFilmCardId] = useState(-1);
  const [genreFilms, setGenreFilms] = useState(props.films);
  const [shownFilmsMul, setShownFilmsMul] = useState(NEXT_LOADING_CARDS_AMOUNT);

  const genreDict = toGenreDict(props.films);
  const tabs = Object.keys(genreDict);

  const changeTab = (tab: string) => {
    if (tab === ALL_GENRES_KEY) {
      setGenreFilms(props.films);
    } else {
      setGenreFilms(genreDict[tab]);
    }
  };

  const increaseShownFilms = () => {
    if (shownFilmsMul < genreFilms.length) {
      setShownFilmsMul(shownFilmsMul + NEXT_LOADING_CARDS_AMOUNT);
    }
  };

  return (
    <Fragment>
      {props.showGenres && <CategoryTabs tabs={tabs} onChangeTab={changeTab}/>}

      <div className="catalog__films-list">
        {genreFilms.slice(0, shownFilmsMul).map((item) => <FilmCard key={item.id} filmInfo={item} onMouseEnterHandler={() => {setActiveFilmCardId(item.id);}} onMouseLeaveHandler={() => {setActiveFilmCardId(-1);}}/>)}
      </div>

      {shownFilmsMul < genreFilms.length && <ShowMoreButton onClick={increaseShownFilms}/>}
    </Fragment>
  );
}

export default FilmList;
