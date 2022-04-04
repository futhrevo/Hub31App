import { Route } from "react-router-dom";

import SessionSelect from './components/SessionSelect';
import SessionResult from './components/SessionResult';
import { CourseInfo } from '../../../redux/courses/reducer';

const CourseResults = ({ course, match }: { course: CourseInfo, match: any }) => {
  const pathname = `${match.url}/:sessId`;

  return (
    <div>
      <SessionSelect path={pathname} courseId={course.id} />
      <Route path={pathname} render={(props) => <SessionResult courseId={course.id} {...props} />} />
    </div>
  );
}

export default CourseResults;
