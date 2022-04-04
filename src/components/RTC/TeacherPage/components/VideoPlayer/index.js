import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

import Icon from '../../../../Icon';
import './styles.scss';

const VideoPlayer = ({ preview, role, stream, autoplay, local, domId, id, audio, video, streamID, handleClick, handleClose, className = '', close, account }) => {
  const loadVideo = useRef(false);
  const loadAudio = useRef(false);
  const lockPlay = useRef(false);
  const [resume, setResume] = useState(false);

  // TODO: only trigger resume when play remote stream
  const needResume = useMemo(() => {
    return resume === true &&
      autoplay === false &&
      local === false;
  }, [resume, autoplay, local]);

  useEffect(() => {
    if (!stream || !domId || (lockPlay.current && stream.isPlaying()))
      return;
    lockPlay.current = true;
    stream.play(`${domId}`, { fit: 'cover' }, (err) => {
      lockPlay.current = false;
      console.warn('[video-player] ', JSON.stringify(err), id, stream.isPaused(), stream.isPlaying(), ' isLocal: ', local);
      if (!autoplay && err && err.audio && err.audio.status !== "aborted" && !local) {
        stream.isPaused() && setResume(true);
        console.warn('[video-player] play failed ', JSON.stringify(err), id, stream.isPaused(), stream.isPlaying());
      }
    });
    return () => {
      if (stream.isPlaying()) {
        stream.stop();
      }
    };
  }, [domId, id, local, autoplay, stream]);

  useEffect(() => {
    if (stream) {
      // prevent already muted audio
      if (!loadAudio.current) {
        if (!audio) {
          stream.muteAudio();
          console.log('stream mute audio');
        }
        loadAudio.current = true;
        return;
      }
      if (audio) {
        console.log('stream unmute audio');
        stream.unmuteAudio();
      }
      else {
        console.log('stream mute audio');
        stream.muteAudio();
      }
    }
  }, [stream, audio]);

  useEffect(() => {
    if (stream) {
      // prevent already muted video
      if (!loadVideo.current) {
        if (!video) {
          console.log('stream mute video');
          stream.muteVideo();
        }
        loadVideo.current = true;
        return;
      }
      if (video) {
        console.log('stream unmute video');
        stream.unmuteVideo();
      }
      else {
        console.log('stream mute video');
        stream.muteVideo();
      }
    }
  }, [stream, video]);

  const onAudioClick = (evt) => {
    if (handleClick && id) {
      handleClick('audio', streamID, id);
    }
  };
  const onVideoClick = (evt) => {
    if (handleClick && id) {
      handleClick('video', streamID, id);
    }
  };
  const onClose = (evt) => {
    if (handleClose && id) {
      handleClose('close', streamID);
    }
  };

  const me = useSelector(state => state.Live);
  return (

    <div className={`${className ? className : (preview ? 'preview-video rotateY180deg' : `agora-video-view ${Boolean(video) === false && stream ? 'show-placeholder' : ''}`)}`}>
      {close ? <div className="icon-close" onClick={onClose}></div> : null}
      {preview ? null : className !== 'screen-sharing' ? <div className={role === 'teacher' ? 'teacher-placeholder' : 'student-placeholder'}></div> : null}
      {preview ? null :
        account ?
          <div className="video-profile">
            <span className="account">{account}</span>
            {`${me.uid}` === `${id}` || me.role === 1 ?
              <span className="media-btn mr-3">
                <Button onClick={onAudioClick} className={`mr-1 rounded-circle ${audio ? "active" : "inactive"}`} variant="danger">
                  <Icon iconStyle="solid" icon={audio ? 'volume-up' : 'volume-mute'} />
                </Button>
                <Button onClick={onVideoClick} className={`rounded-circle ${video ? "active" : "inactive"}`} variant="danger">
                  <Icon iconStyle="solid" icon={video ? 'video' : 'video-slash'} />
                </Button>
              </span> : null}
          </div>
          : null
      }
      <div id={`${domId}`} className={`agora-rtc-video ${local ? 'rotateY180deg' : ''}`}></div>
      {needResume ? <div className="clickable" onClick={() => {
        stream.resume().then(() => {
          setResume(false);
          console.log("clickable");
        }).catch(console.warn);
      }}></div> : null}
    </div>

  );
}

export default React.memo(VideoPlayer);
