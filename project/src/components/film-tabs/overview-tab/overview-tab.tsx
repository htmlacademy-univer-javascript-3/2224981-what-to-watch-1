import {Fragment} from 'react';
import FilmInfo from '../../../types/film-info';
import {ratingToString} from '../../../utils/ratings';

type OverviewTabProps = {
  film: FilmInfo;
}

function OverviewTab({film}: OverviewTabProps) {
  return (
    <Fragment>
      <div className="film-rating">
        <div className="film-rating__score">{film.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{ratingToString(film.rating)}</span>
          <span className="film-rating__count">{film.scoresCount} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>
          {film.description}
        </p>

        <p className="film-card__director"><strong>Director: {film.director}</strong></p>

        <p className="film-card__starring">
          <strong>Starring: {film.starring.join(', ')}</strong>
        </p>
      </div>
    </Fragment>
  );
}

export default OverviewTab;
