import PropTypes from 'prop-types';
import { useAlert } from 'react-alert';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { Button, ButtonGroup, ButtonToolbar, Container } from 'react-bootstrap';
import QuestionEditor from '../components/QuestionEditor/index.js';
import ErrorBoundary from '../../../pages/ErrorBoundary';
import { addQuestionInPaper } from '../../../redux/qpaper/actions';
import PageHeader from '../../PageHeader';

const AddQuestionInPaper = ({ match }: { match: any }) => {
  let dispatch = useDispatch();
  let history = useHistory();
  const alert = useAlert();

  const { link: pid }: { link: string } = match.params;

  const handleBack = () => {
    history.goBack();
  }

  const onSuccess = (temp: any, qid: string, values: any) => {
    try {
      values.id = qid;
      dispatch(addQuestionInPaper(pid, values))
      alert.success('Question added');
      handleBack();
    } catch (error) {
      alert.error("Unable to save changes");
    }
  }

  return (
    <ErrorBoundary>
      <Container className="flex-fill my-5">
        <div className="newQuestion">
          <PageHeader title="New Question">
            <ButtonToolbar className="float-right">
              <ButtonGroup size="sm">
                <Button
                  variant="danger"
                  onClick={() => handleBack()}
                >
                  Cancel
                </Button>
              </ButtonGroup>
            </ButtonToolbar>
          </PageHeader>
          {/* @ts-ignore */}
          <QuestionEditor paper={pid} history={history} onSuccess={onSuccess} />
        </div>
      </Container>
    </ErrorBoundary>
  );
}

AddQuestionInPaper.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object.isRequired,
};

export default AddQuestionInPaper;
