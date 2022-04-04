import React, { useEffect, useState } from 'react';
import { Alert, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { fetchLives } from '../../../redux/courses/liveActions';
import { RootState } from '../../../redux/store';
import Loading from '../../Loading';
import CourseAddLive from './components/CourseAddLive';
import CourseLiveItem from './components/CourseLiveItem';


const CourseLivesList = ({ page, lives, loading, sessId }: { loading: boolean, sessId: number, page: number, lives: Array<any> }) => {
  // const alert = useAlert();
  let history = useHistory();
  if (loading) {
    return <Loading />;
  }

  if (page === 1 && lives.length === 0) {
    return <Alert variant="warning">No Live Started</Alert>;
  }
  const gotoLive = (live: any, sess: number) => {
    const cAt = live.attr.split('_')[1];
    history.push(`/live/${live.courseId}/${sess}/${cAt}`);
  }
  return (
    <ListGroup>
      {lives.map(live => (
        <CourseLiveItem
          key={live.channel}
          live={live}
          active={live.isAct}
          onClick={live.isAct ? () => gotoLive(live, sessId) : null}
        />
      ))}
    </ListGroup>
  );
}
const CourseLives = ({ course }: { course: any }) => {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [page, setPage] = useState(1);
  const [lives, setLives] = useState([]);
  const [pageFetching, setPageFetching] = useState(true)
  const Lives = useSelector((state: RootState) => state.Courses[course.id].Lives);

  useEffect(() => {
    if (!Lives.loading && !Lives.fetched) {
      dispatch(fetchLives(course.id));
    }
  }, [dispatch, course.id, Lives.loading, Lives.fetched]);

  useEffect(() => {
    // checkpage already exists
    if (page <= Lives.pagination.total) {
      const livepage = Lives.pagination.pages[page];
      const ids = livepage.ids.map((el: string) => Lives.lives[el]);
      setLives(ids);
      setPageFetching(livepage.fetching);
    } else {
      // check if new page needs to be fetched
      if (Boolean(Lives.last)) {
        dispatch(fetchLives(course.id));
      }
    }
  }, [page, Lives.last, Lives.lives, Lives.pagination.pages, Lives.pagination.total, course.id, dispatch]);

  const running = Boolean(Lives.active);
  const sessId = course.sess.cAt;
  if (Lives.loading) {
    return <Loading />;
  }
  return (
    <div>
      {running ? null : (<>
        <CourseAddLive courseId={course.id} />
      </>)}
      <CourseLivesList page={page} lives={lives} sessId={sessId} loading={pageFetching} />
    </div>
  );
}

export default CourseLives;
