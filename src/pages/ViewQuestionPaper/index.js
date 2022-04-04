import PropTypes from 'prop-types';
import { useEffect, useState, lazy } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Loading from '../../components/Loading';
import { PaperContext } from '../../components/QuestionPaper/context';
import RenderQPreview from '../../components/QuestionPaper/components/RenderQPreview';
import { fetchPaperDetails, removePaper } from '../../redux/qpaper/actions';
import ErrorBoundary from '../ErrorBoundary';
import NotFound from '../NotFound';
import './styles.scss';

import ViewPaper from '../../components/QuestionPaper/ViewPaper';
const ViewManual = lazy(() => import('../../components/QuestionPaper/ViewManual'));
const ViewResults = lazy(() => import('../../components/QuestionPaper/ViewResults'));
const EditQuestionpaper = lazy(() => import('../../components/QuestionPaper/EditQuestionPaper'));
const AddQuestionInPaper = lazy(() => import('../../components/QuestionPaper/AddQuestionInPaper'));
const EditQuestionInPaper = lazy(() => import('../../components/QuestionPaper/EditQuestionInPaper'));

const ViewQuestionpaper = ({ match }) => {
  const [showPreview, setPreview] = useState(false);
  const [doc, setDoc] = useState({});
  const dispatch = useDispatch();
  const { link: pid } = match.params;

  const { loading, paper } = useSelector(state => ({
    loading: state?.QPaper?.loading,
    paper: state?.QPaper?.paper ?? {},
    error: state?.QPaper?.error ?? {},
  }))

  useEffect(() => {
    dispatch(fetchPaperDetails(pid))

    return () => dispatch(removePaper())
  }, [dispatch, pid]);

  const openPreview = (doc) => {
    setPreview(true);
    setDoc(doc);
  }

  const closePreview = () => {
    setPreview(false);
  }

  if (loading === undefined || loading) {
    return <Loading />;
  }

  if (!paper) {
    return <NotFound />
  }
  const pathname = match.path;

  const value = {
    state: { doc, showPreview, paper, basepath: match.path, baseurl: match.url, ...match.params },
    actions: { openPreview }
  }
  return (
    <ErrorBoundary>
      <PaperContext.Provider value={value}>
        <Container className="flex-fill my-5">
          <div className="viewQuestionpaper">

            <ErrorBoundary>
              <Switch>
                <Route exact path={pathname} render={(props) => <ViewPaper paper={paper} {...props} />} />
                <Route path={`${pathname}/results`} render={(props) => <ViewResults id={pid} paper={paper} {...props} />} />
                <Route exact path={`${pathname}/manual`} render={(props) => <ViewManual id={pid} paper={paper} {...props} />} />
                <Route exact path={`${pathname}/edit`} render={(props) => <EditQuestionpaper {...props} />} />
                <Route exact path={`${pathname}/add`} render={(props) => <AddQuestionInPaper {...props} />} />
                <Route exact path={`${pathname}/:qid/edit`} render={(props) => <EditQuestionInPaper {...props} />} />
              </Switch>
            </ErrorBoundary>
          </div>
          <RenderQPreview
            doc={doc}
            show={showPreview}
            onHide={closePreview}
          />
        </Container>
      </PaperContext.Provider>
    </ErrorBoundary>
  );
}

ViewQuestionpaper.propTypes = {
  paper: PropTypes.object,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  questions: PropTypes.array,
  selected: PropTypes.array,
  refresh: PropTypes.bool,
};
ViewQuestionpaper.defaultProps = {
  loading: true,
  questions: [],
  selected: [],
  refresh: false,
}

export default ViewQuestionpaper;

