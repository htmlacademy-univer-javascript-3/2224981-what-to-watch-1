import {useEffect, useRef} from 'react';

type VideoPlayerProps = {
  previewImage: string;
  videoLink: string;
  playSound: boolean;
  width: number;
  height: number;
  delayMs: number;
}

function MiniVideoPlayer(props: VideoPlayerProps) {
  const playerRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const delay = setTimeout(() => playerRef.current?.play(), props.delayMs);

    return () => clearTimeout(delay);
  });

  return (
    <video ref={playerRef} className="player__video" poster={props.previewImage} muted={props.playSound} width={props.width.toString()} height={props.height.toString()}>
      <source src={props.videoLink} type="video/mp4"/>
    </video>
  );
}

export default MiniVideoPlayer;
