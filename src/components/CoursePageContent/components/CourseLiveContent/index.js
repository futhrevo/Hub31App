import { Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

import CourseLiveItem from '../../../Course/CourseLiveList/components/CourseLiveItem';

const CourseLiveContent = ({ courseId, activLive }) => {
  let history = useHistory();
  const { live } = useSelector(state => ({
    live: state.Courses[courseId]?.Lives?.lives[activLive] ?? {}
  }));

  if (activLive.length < 1) {
    return <Alert variant="info">No Live in Progress</Alert>;
  }

  const gotoLive = (live) => {
    const cAt = live.attr.split('_')[1];
    history.push(`/live/${live.courseId}/${cAt}`);
  }

  return (
    <CourseLiveItem
      live={live}
      active={live.isAct}
      onClick={live.isAct ? () => gotoLive(live) : null}
    />
  );
}

export default CourseLiveContent;
