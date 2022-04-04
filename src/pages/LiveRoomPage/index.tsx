import { Container } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { LiveNav } from '../../components/RTC';
import { RootState } from '../../redux/store';
import ErrorBoundary from '../ErrorBoundary';
import './styles.scss';
import Chat from '../../components/RTC/Chat';
import { ContainerProvider } from '../../components/RTC/context';
import TeacherPage from '../../components/RTC/TeacherPage';

const LiveRoomPage = () => {
  const Live = useSelector((state: RootState) => state.Live);
  const { id, sess, _at } = useParams<{ id: string, sess: string, _at: string }>();
  return (
    <ErrorBoundary>
      <ContainerProvider courseId={id} sessId={Number(sess)} at={Number(_at)} >
        <Container fluid className="px-0 flex-fill min-vh-nav live-class">
          <LiveNav />

          <TeacherPage channel={Live.course.channel} />
          <Chat channel={Live.course.channel} />

        </Container>
      </ContainerProvider>
    </ErrorBoundary>
  );
}

export default LiveRoomPage;
