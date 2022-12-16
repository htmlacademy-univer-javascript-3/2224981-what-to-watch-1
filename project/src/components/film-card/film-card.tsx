import FilmInfo from '../../types/film-info';
import {Link} from 'react-router-dom';
import AppRoutes from '../../const/app-routes';
import MiniVideoPlayer from '../mini-video-player/mini-video-player';
import {useState} from 'react';

type FilmCardProps = {
  filmInfo: FilmInfo;
  onMouseEnterHandler?: () => void;
  onMouseLeaveHandler?: () => void;
}

function FilmCard(props: FilmCardProps): JSX.Element {
  const [showPreview, setShowPreview] = useState(false);

  function onMouseEnterWrapper() {
    if (props.onMouseEnterHandler) {
      props.onMouseEnterHandler();
    }

    setShowPreview(true);
  }

  function onMouseLeaveWrapper() {
    if (props.onMouseLeaveHandler) {
      props.onMouseLeaveHandler();
    }

    setShowPreview(false);
  }

  return (
    <article className="small-film-card catalog__films-card" onMouseEnter={onMouseEnterWrapper} onMouseLeave={onMouseLeaveWrapper}>
      <Link className="small-film-card__link" to={`/${AppRoutes.FilmsRoot}${props.filmInfo.id}`}>
        <div className="small-film-card__image">
          {showPreview && <MiniVideoPlayer previewImage={props.filmInfo.previewImage} videoLink={props.filmInfo.videoLink} playSound={false} width={280} height={175} delayMs={1000}/>}
          <img src={props.filmInfo.previewImage} width="280" height="175" alt={props.filmInfo.name}/>
        </div>
        <h3 className="small-film-card__title">
          {props.filmInfo.name}
        </h3>
      </Link>
    </article>
  );
}

export default FilmCard;
