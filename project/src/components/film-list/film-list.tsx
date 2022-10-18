import FilmInfo from '../../types/film-info';
import FilmCard from '../film-card/film-card';
import {useState} from 'react';
import CategoryTabs from '../category-tabs/category-tabs';

type FilmListProps = {
  films: FilmInfo[],
  showGenres: boolean
}

function FilmList(props: FilmListProps) {
  const [/*activeFilmCardId*/, setActiveFilmCardId] = useState(-1);

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      {props.showGenres && <CategoryTabs/>}

      <div className="catalog__films-list">
        {props.films.map((item) => <FilmCard key={item.id} filmInfo={item} onMouseEnterHandler={() => {setActiveFilmCardId(item.id);}} onMouseLeaveHandler={() => {setActiveFilmCardId(-1);}}/>)}
      </div>

      <div className="catalog__more">
        <button className="catalog__button" type="button">Show more</button>
      </div>
    </section>
  );
}

export default FilmList;
