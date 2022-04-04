import { useEffect, useState, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import ReactPlayer from 'react-player/lazy';

import Loading from '../../../../Loading';
import { authVid } from '../../../../../api/videos';
import { readDocAction } from '../../../../../redux/courses/enrollActions';
// import ClassVideoView from './components/ClassVideoView';
import ClassVideoNonMS from './components/ClassVideoNonMS';
import './styles.scss';
import PageHeader from '../../../../PageHeader';

const ClassVideo = ({ courseId, chap, mat }) => {
  const ref = useRef(null);
  const [loading, setLoading] = useState(true);
  const [vid, setVideo] = useState(null);
  const [showmark, setMark] = useState(false);
  const [markloc, setMarkLoc] = useState({ top: '0px', left: '0px' })
  const dispatch = useDispatch();

  const { sub } = useSelector(state => ({
    sub: state.Accounts.sub,
  }))

  useEffect(() => {
    async function authVideo() {
      try {
        setLoading(true);
        const res = await authVid(courseId, chap.id, mat.id);
        if (res.vid) {
          setVideo(res.vid);
        }
        const localResult = {
          p: mat.points, d: Date.now(),
        }
        dispatch(readDocAction(courseId, chap.id, mat.id, localResult));
      } catch (e) {
        alert.error("Unable to authenticate request");
      } finally {
        setLoading(false);
      }
    }
    authVideo();
  }, [courseId, chap.id, mat.id, mat.points, dispatch]);

  const handleProgress = useCallback((progress) => {
    if (progress.playedSeconds > 0 && Math.round(progress.playedSeconds) % 19 === 0) {
      // show every 19% of video
      setMarkLoc({ top: `${progress.played * 10}px`, left: `${progress.loaded * 10}px` })
      setMark(true);
    }
    else { setMark(false); }
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (vid.link && ReactPlayer.canPlay(vid.link)) {
    return (
      <>
        <div className='player-wrapper'>
          {showmark ? <div className="water-mark" style={markloc}>{sub}</div> : null}
          <ReactPlayer
            className='react-player'
            ref={ref}
            url={vid.link}
            controls
            width='100%'
            height='100%'
            config={{
              youtube: {
                playerVars: {
                  modestbranding: 1, rel: 0, origin: 'https://www.hub31.com'
                }
              }
            }}
            onProgress={e => handleProgress(e)}
          />
        </div>
        <PageHeader title={mat && mat.title} subtitle={chap && chap.desc} />
      </>
    );
  }
  if (
    document.createElement('video').canPlayType('application/vnd.apple.mpegurl')
  ) {
    return <ClassVideoNonMS video={vid} mat={mat} />;
  }
  return <Alert variant="danger">THis Browser is not Compatible</Alert>;
};

export default ClassVideo;
