import { Route } from "react-router-dom";
import SessionSelect from '../../Course/CourseResults/components/SessionSelect';
import QuizSessionResults from "./components/QuizSessionResults";
import { QPaper } from '../../../redux/qpaper/reducer';
import Header from './components/Header';

const ViewResults = ({ id, paper, match }: { id: string, match: any, paper: QPaper }) => {
  const { courseId } = match.params;
  const pathname = `${match.path}/:sessId`;
  const pathUrl = `${match.url}/:sessId`;

  return (
    <div>
      <Header />
      <SessionSelect path={pathUrl} courseId={courseId} />
      <Route path={pathname} render={(props) => <QuizSessionResults id={id} paper={paper} {...props} />} />
    </div>
  );
}

export default ViewResults;
