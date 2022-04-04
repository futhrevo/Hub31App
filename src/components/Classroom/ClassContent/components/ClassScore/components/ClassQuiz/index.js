import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import { getPublicAll } from '../../../../../../../api/questionpapers';
import { gradeQuiz } from '../../../../../../../api/sturesults';
import { readDocAction } from '../../../../../../../redux/courses/enrollActions';
import Loading from '../../../../../../Loading';
import RenderQuestion from './components/RenderQuestion';
import PageHeader from '../../../../../../PageHeader';

class ClassQuiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quizid: props.mat.id,
      answers: {},
      started: Date.now(),
      review: false,
      truth: {},
      isSubmit: false,
      paper: {},
      questions: [],
      isFetched: false,
      score: 0,
      agg: 1,
      canRetake: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitQuiz = this.submitQuiz.bind(this);
    this.handleRetake = this.handleRetake.bind(this);
  }

  async componentDidMount() {
    const { quizid } = this.state;
    const { courseId, chap } = this.props;
    try {
      const res = await getPublicAll(courseId, chap.id, quizid) || {};
      this.setState({
        paper: res.paper,
        questions: res.questions,
        isFetched: true,
      });
    } catch (error) {
      this.props.alert.error(error.message || "Unable to fetch Question paper");
    }
  }

  handleInputChange(event, type, index, id, section) {
    const { target } = event;
    const { answers } = this.state;
    switch (type) {
      case 1: {
        // mcq
        if (target.type === 'radio') {
          // check if question id exist
          let oldAnswers = [];
          if (answers && Object.prototype.hasOwnProperty.call(answers, id)) {
            oldAnswers = [...this.state.answers[id]];
          }
          oldAnswers[section] = [index];
          const newanswers = { ...this.state.answers, [id]: oldAnswers };
          this.setState({ answers: newanswers });
        } else if (target.type === 'checkbox') {
          // check if question id exist
          let oldAnswers = [];
          let newArray = [];
          let temp = [];
          if (answers && Object.prototype.hasOwnProperty.call(answers, id)) {
            oldAnswers = [...this.state.answers[id]];
            // check if section is attempted
            if (oldAnswers[section] !== 'undefined') {
              temp = oldAnswers[section].slice();
            } else {
              // section not attempted yet
            }
          } else {
            // question not attempted yet
          }
          if (target.checked) {
            newArray = temp.concat(index).sort();
          } else {
            newArray = temp.filter(e => e !== index);
          }
          oldAnswers[section] = newArray;
          const newanswers = { ...this.state.answers, [id]: oldAnswers };
          this.setState({ answers: newanswers });
        }
        break;
      }
      case 3: {
        if (target.type === 'radio') {
          const rowname = target.name.replace(`table${id}${section}`, '');
          const row = Number(rowname);
          let oldAnswers = [];
          let newArray = [];
          // check if question id exist
          if (answers && Object.prototype.hasOwnProperty.call(answers, id)) {
            oldAnswers = [...this.state.answers[id]];
            // check if section is attempted
            if (oldAnswers[section] !== 'undefined') {
              newArray = oldAnswers[section].slice();
            } else {
              // section not attempted yet
            }
          } else {
            // question not attempted yet
          }
          newArray[row] = index;
          oldAnswers[section] = newArray;
          const newanswers = { ...this.state.answers, [id]: oldAnswers };
          this.setState({ answers: newanswers });
        }
        break;
      }
      case 4: {
        // check if question id exist
        let oldAnswers = [];
        const { value } = target;
        if (answers && Object.prototype.hasOwnProperty.call(answers, id)) {
          oldAnswers = [...this.state.answers[id]];
        }
        oldAnswers[section] = [value.trim().toLowerCase()];
        const newanswers = { ...this.state.answers, [id]: oldAnswers };
        this.setState({ answers: newanswers });
        break;
      }
      default:
        break;
    }
  }

  handleRetake() {
    this.setState({ answers: {}, started: Date.now(), review: false, truth: {}, isSubmit: false, score: 0, canRetake: false })
  }
  async submitQuiz() {
    // eslint-disable-next-line no-unused-vars
    const { eid, mat, courseId, sessId, chap, readDocAction } = this.props;
    const { answers, started, paper } = this.state;
    if (Object.keys(answers).length !== paper.questions.length) {
      this.props.alert.error("Not all questions attempted");
      return;
    }
    this.setState({ isSubmit: true });
    try {
      const { ans, score, agg = 1 } = await gradeQuiz(courseId, sessId, chap.id, mat.id, started, answers);
      this.setState({ review: true, truth: ans, score, agg, canRetake: score < agg });
      const localResult = {
        p: 0,
        d: Date.now(),
      }
      if (score * 100 / agg >= paper.criteria) {
        // quiz criteria satisfied hence passed
        localResult.p = mat.points;
      }
      readDocAction(courseId, chap.id, mat.id, localResult);
    } catch (error) {
      this.props.alert.error("Unable to submit quiz");
    }
  }

  render() {
    const {
      review, truth, isSubmit, isFetched, paper, questions, score, agg, canRetake
    } = this.state;
    const { chap } = this.props;
    if (!isFetched) {
      return <Loading />;
    }
    return (
      <div className="classQuiz m-3">
        <PageHeader title={paper && paper.title} subtitle={chap && chap.desc} sub2={`${paper && paper.questions.length} Questions`}>
          {review ? (
            <div className="float-right">
              <h2>{`Score: ${score * 100 / agg} %`}</h2>
              <Button
                variant="info"
                disabled={!canRetake}
                onClick={canRetake ? this.handleRetake : null}
              >
                {canRetake ? 'Retake Quiz' : 'Completed'}
              </Button>
            </div>
          ) : (
            <Button
              variant="primary"
              disabled={isSubmit || review}
              onClick={!isSubmit ? this.submitQuiz : null}
              className="float-right"
            >
              {isSubmit ? 'Submitting' : 'Submit Answers'}
            </Button>
          )}
        </PageHeader>
        <ol>
          {questions &&
            questions.map((q, i) => (
              <RenderQuestion
                key={q.id}
                doc={q}
                id={i}
                qid={q.id}
                answers={this.state.answers[q.id]}
                onChange={this.handleInputChange}
                preview={false}
                review={review}
                truth={truth}
              />
            ))}
        </ol>
      </div>
    );
  }
}

ClassQuiz.propTypes = {
  eid: PropTypes.number,
  mat: PropTypes.object,
};

const mapStateToProps = (state) => ({
  fname: state.Accounts.dname
});

const mapDispatchToProps = dispatch => {
  return {
    readDocAction: (courseId, chapterId, matId, result) => {
      dispatch(readDocAction(courseId, chapterId, matId, result))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withAlert()(ClassQuiz));
