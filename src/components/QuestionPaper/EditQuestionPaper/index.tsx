
import PropTypes from 'prop-types';
import {
  Button,
  ButtonGroup,
  ButtonToolbar, Col, Container,
  ListGroup, Row
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath } from "react-router";
import { useHistory } from "react-router-dom";
import Loading from '../../Loading';
import QuestionpaperEditor from './components/QuestionpaperEditor.js';
import RenderListItem from '../ViewPaper/components/RenderListItem';
import { pvtLinksMap } from '../../../layouts/Routes';
import { addSelected, downSelected, removeSelected, upSelected } from '../../../redux/qpaper/actions';
import { RootState } from '../../../redux/store';
import ErrorBoundary from '../../../pages/ErrorBoundary';
import NotFound from '../../../pages/NotFound';
import PageHeader from '../../PageHeader';
import './styles.scss';

const cancelEdit = (history: any, params: any) => {
  history.push(generatePath(pvtLinksMap.get("ViewQuestionpaper")?.path ?? '/', params));
};

// Edit QuestionPaper recursive network calls
const EditQuestionpaper = ({ match }: { match: any }) => {
  const { loading, paper, error, selected, questions } = useSelector((state: RootState) => ({
    loading: state?.QPaper?.loading,
    paper: state?.QPaper?.paper ?? {},
    error: state?.QPaper?.error ?? {},
    selected: state?.QPaper?.selected ?? [],
    questions: state?.QPaper?.unused ?? []
  }))
  let dispatch = useDispatch();
  let history = useHistory();


  if (loading === undefined || loading) {
    return <Loading />;
  }
  if (!paper?.title) {
    return <NotFound />
  }

  return (
    <ErrorBoundary>
      <Container className="flex-fill my-5">
        <div className="editQuestionpaper">
          <Row>
            <Col xs={12}>
              <PageHeader title={`Editing "${paper.title}"`}>
                <ButtonToolbar className="float-right">
                  <ButtonGroup size="sm">
                    <Button
                      variant="danger"
                      onClick={() => cancelEdit(history, match.params)}
                    >
                      Cancel
                    </Button>
                  </ButtonGroup>
                </ButtonToolbar>
              </PageHeader>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={6} className="col-box">
              <Col md={12}>
                <h4>Question Paper</h4>
                <ListGroup>
                  {selected.map((id: string) => (
                    <RenderListItem
                      key={id}
                      id={id}
                      onSelect={question => dispatch(removeSelected(question))}
                      onClickUp={id => dispatch(upSelected(id))}
                      onClickDown={id => dispatch(downSelected(id))}
                    />
                  ))}
                </ListGroup>
              </Col>
            </Col>
            <Col xs={12} sm={6} className="col-box">
              <Col md={12}>
                <h4>Question Bank</h4>
                <ListGroup>
                  {questions.map((id: string) => (
                    <RenderListItem
                      key={id}
                      id={id}
                      onSelect={question => dispatch(addSelected(question))}
                    />
                  ))}
                </ListGroup>
              </Col>
            </Col>
          </Row>
          <QuestionpaperEditor
            doc={paper}
            match={match}
            history={history}
            selected={selected}
            unused={questions}
          />
        </div>
      </Container>
    </ErrorBoundary>
  );
}

EditQuestionpaper.propTypes = {
  history: PropTypes.object.isRequired,
  paper: PropTypes.object,
  loading: PropTypes.bool,
  questions: PropTypes.array,
  match: PropTypes.object
};

EditQuestionpaper.defaultProps = {
  loading: true,
}

export default EditQuestionpaper;
