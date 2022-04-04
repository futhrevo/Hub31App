import PropTypes from 'prop-types';
import { Container, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ErrorBoundary from '../../../pages/ErrorBoundary';
import QuestionEditor from '../components/QuestionEditor/index.js';
import Loading from '../../Loading';
import { updateQues } from '../../../redux/qpaper/actions';
import PageHeader from '../../PageHeader';

const EditQuestionInPaper = ({ match, history }) => {
  let dispatch = useDispatch();
  const { question, loading } = useSelector(state => ({
    loading: state?.QPaper?.loading,
    question: state?.QPaper?.bank[match.params.qid] ?? {}
  }))

  if (loading) {
    return <Loading />;
  }

  const handleBack = () => {
    history.goBack();
  }

  const onSuccess = (history, qid, values) => {
    values.id = qid;
    dispatch(updateQues(qid, values))
    handleBack(history)
  }
  return (
    <ErrorBoundary>
      <Container className="flex-fill my-5">
        <div className="newQuestion">
          <PageHeader title="Editing">
            <ButtonToolbar className="float-right">
              <ButtonGroup size="sm">
                <Button variant="danger" onClick={() => handleBack(history)}>
                  Cancel
                </Button>
              </ButtonGroup>
            </ButtonToolbar>
          </PageHeader>
          <QuestionEditor
            doc={question}
            history={history}
            onSuccess={onSuccess}
          />
        </div>
      </Container>
    </ErrorBoundary>
  );
}

EditQuestionInPaper.propTypes = {
  doc: PropTypes.object,
  history: PropTypes.object,
  loading: PropTypes.bool,
};

EditQuestionInPaper.defaultProps = {
  loading: true,
  doc: {}
}
export default EditQuestionInPaper;

