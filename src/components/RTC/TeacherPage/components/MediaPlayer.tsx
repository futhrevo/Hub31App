import { ILocalVideoTrack, IRemoteVideoTrack, ILocalAudioTrack, IRemoteAudioTrack, } from "agora-rtc-sdk-ng";
import React, { useRef, useEffect, useMemo } from "react";
import { ResponsiveEmbed, ResponsiveEmbedProps } from 'react-bootstrap';

export interface VideoPlayerProps {
  videoTrack: ILocalVideoTrack | IRemoteVideoTrack | undefined;
  audioTrack: ILocalAudioTrack | IRemoteAudioTrack | undefined;
  aspectRatio: ResponsiveEmbedProps["aspectRatio"] | undefined
}

const MediaPlayer = (props: VideoPlayerProps) => {
  const container = useRef<HTMLDivElement>(null);

  const camInUse = useMemo(() => props.videoTrack?.isPlaying, [props.videoTrack?.isPlaying]);
  const micInUse = useMemo(() => props.audioTrack?.isPlaying, [props.audioTrack?.isPlaying]);
  // const [camInUse, setCamInuse] = useState(props.videoTrack?.isPlaying);
  // const [micInUse, setMicInUse] = useState(props.audioTrack?.isPlaying);

  useEffect(() => {
    if (!container.current) return;
    !camInUse && props.videoTrack?.play(container.current);
    return () => {
      // !camInUse && props.videoTrack?.stop();
    };
  }, [camInUse, container, props.videoTrack]);

  useEffect(() => {
    !micInUse && props.audioTrack?.play();
    return () => {
      // !micInUse && props.audioTrack?.stop();
    };
  }, [micInUse, props.audioTrack]);


  return (
    <ResponsiveEmbed aspectRatio={props.aspectRatio}>
      <div ref={container} className="video-player" ></div>
    </ResponsiveEmbed>
  );
}

export default MediaPlayer;
