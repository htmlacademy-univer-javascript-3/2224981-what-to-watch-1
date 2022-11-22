import FilmInfo from '../../types/film-info';
import {SyntheticEvent, useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {formatFilmLeftTime} from '../../utils/time-format';
import {checkFullScreen, exitFullScreen, requestFullScreen} from '../../services/fullscreen-api';

type VideoPlayerProps = {
  film: FilmInfo
};

export function VideoPlayer(props: VideoPlayerProps) {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<HTMLVideoElement | null>(null);
  const navigate = useNavigate();

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeCode, setTimeCode] = useState(formatFilmLeftTime(props.film.runTime, 0));

  const update = (evt: SyntheticEvent<HTMLVideoElement>) => {
    if (playing) {
      const curTimeSec = evt.currentTarget.currentTime;
      setTimeCode(formatFilmLeftTime(props.film.runTime, curTimeSec));
      setProgress(curTimeSec / (props.film.runTime * 60));
    }
  };

  const toggleFullScreen = () => {
    if (checkFullScreen()) {
      exitFullScreen();
    } else {
      if (parentRef?.current) {
        requestFullScreen(parentRef?.current);
      }
    }
  };

  const togglePlayer = () => {
    if (playing) {
      playerRef.current?.pause();
    } else {
      playerRef.current?.play();
    }

    setPlaying(!playing);
  };

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      togglePlayer();
    }

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="player" ref={parentRef}>
      <video ref={playerRef} onTimeUpdate={update} className="player__video" poster={props.film.previewImage}>
        <source src={props.film.videoLink} type="video/mp4"/>
      </video>

      <button type="button" className="player__exit" onClick={() => {navigate(-1);}}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={progress} max="100"></progress>
            <div className="player__toggler" style={{left: `${progress}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{timeCode}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={togglePlayer}>
            <svg viewBox="0 0 19 19" width="19" height="19">
              {!playing && <use xlinkHref="#play-s"></use>}
              {playing && <use xlinkHref="#pause"></use>}
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">{props.film.name}</div>

          <button type="button" className="player__full-screen" onClick={toggleFullScreen}>
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}
