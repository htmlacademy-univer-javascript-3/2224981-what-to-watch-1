import FilmInfo from '../../types/film-info';
import {Link} from 'react-router-dom';
import AppRoutes from '../../const/app-routes';

type FilmCardProps = {
  filmInfo: FilmInfo;
  onMouseEnterHandler?: () => void;
  onMouseLeaveHandler?: () => void;
}

function FilmCard(props: FilmCardProps): JSX.Element {
  return (
    <article className="small-film-card catalog__films-card" onMouseEnter={props.onMouseEnterHandler} onMouseLeave={props.onMouseLeaveHandler}>
      <div className="small-film-card__image">
        <img src={props.filmInfo.previewImage} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={AppRoutes.FilmsRoot + props.filmInfo.id}>{props.filmInfo.name}</Link>
      </h3>
    </article>
  );
}

export default FilmCard;
