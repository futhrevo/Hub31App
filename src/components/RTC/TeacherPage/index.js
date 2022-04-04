import { Row, Col } from 'react-bootstrap';
import { WhiteBoard } from './components';
import useWindowSize from '../../useWindowSize';
import { useAgoraLiveState } from "../context";
import MediaPlayer from './components/MediaPlayer';

const TeacherPage = ({ channel }) => {
  const { state: { isTeacher, localVideoTrack, localAudioTrack, teacher }, actions: { } } = useAgoraLiveState();
  // eslint-disable-next-line no-unused-vars
  const windowSize = useWindowSize();

  return (
    <Row className="flex-fill" noGutters>
      <Col xs={12} sm={12} md={6} className="d-flex flex-column justify-content-start align-items-center">
        <h6 className="d-none d-md-block my-3">Teacher</h6>
        <div style={{ width: '100%', height: 'auto' }}>
          <MediaPlayer videoTrack={isTeacher ? localVideoTrack : teacher?.videoTrack} audioTrack={isTeacher ? localAudioTrack : teacher?.videoTrack} aspectRatio="16by9" />
        </div>

      </Col>
      <Col xs={12} sm={12} md={6} className="d-flex flex-column justify-content-start align-items-center">
        <h6 className="d-none d-md-block my-3">White Board</h6>
        <div style={{ width: '100%', height: 'auto' }}>
          <WhiteBoard channel={channel} student={!isTeacher} windowSize={windowSize} />
        </div>
      </Col>
    </Row>
  );
}

export default TeacherPage;

/**   {teacher ? <VideoPlayer
          windowSize={windowSize}
          role="teacher"
          streamID={teacher.streamID}
          stream={teacher.stream}
          domId={`dom-${teacher.streamID}`}
          id={`${teacher.streamID}`}
          account={teacher.account}
          handleClick={onPlayerClick}
          audio={Boolean(teacher.audio)}
          video={Boolean(teacher.video)}
          local={Boolean(teacher.local)}
          autoplay={Boolean(Live.me.coVideo)}
        /> : <VideoPlayer
          role="teacher"
          account={'teacher'}
          streamID={0}
          video={true}
          audio={true}
        />} */
