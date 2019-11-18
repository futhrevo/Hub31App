import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import Meteor from 'meteorjs-client';

import { RenderQuestion } from '../RenderQuestion';
import { Loading } from '../Loading';
import { connectAlert } from '../Alert';

import styles from './styles';

class QuizView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quiz_id: props.mat._id,
      answers: {},
      started: new Date(),
      review: false,
      truth: [],
      isSubmit: false,
      nowShow: 0,
      paper: {},
      questions: [],
      isFetched: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitQuiz = this.submitQuiz.bind(this);
    this.renderQuestion = this.renderQuestion.bind(this);
    this.upQ = this.upQ.bind(this);
    this.downQ = this.downQ.bind(this);
  }

  componentDidMount() {
    const { quiz_id } = this.state;
    Meteor.call('questionPapers.getall', quiz_id, (err, res) => {
      if (err) {
        this.props.alertWithType('error', 'Error', `${err.reason}`);
      } else {
        this.setState({
          paper: res.paper,
          questions: res.questions,
          isFetched: true,
        });
      }
    });
  }

  handleInputChange(event, type, index, _id, section) {
    const { target } = event;
    const { answers } = this.state;
    switch (type) {
      case 1: {
        // mcq
        // check if question id exist
        let oldAnswers = [];
        if (Object.prototype.hasOwnProperty.call(answers, _id)) {
          oldAnswers = [...this.state.answers[_id]];
        }
        oldAnswers[section] = [index];
        const newanswers = { ...this.state.answers, [_id]: oldAnswers };
        this.setState({ answers: newanswers });
        break;
      }
      case 2: {
        // check if question id exist
        let oldAnswers = [];
        let newArray = [];
        let temp = [];
        if (answers && Object.prototype.hasOwnProperty.call(answers, _id)) {
          oldAnswers = [...this.state.answers[_id]];
          // check if section is attempted
          if (oldAnswers[section] !== 'undefined') {
            temp = oldAnswers[section].slice();
          } else {
            // section not attempted yet
          }
        } else {
          // question not attempted yet
        }
        if (!(temp.indexOf(index) > -1)) {
          newArray = temp.concat(index).sort();
        } else {
          newArray = temp.filter((e) => e !== index);
        }
        oldAnswers[section] = newArray;
        const newanswers = { ...this.state.answers, [_id]: oldAnswers };
        this.setState({ answers: newanswers });
        break;
      }
      case 3: {
        const row = target;
        let oldAnswers = [];
        let newArray = [];
        // check if question id exist
        if (Object.prototype.hasOwnProperty.call(answers, _id)) {
          oldAnswers = [...this.state.answers[_id]];
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
        const newanswers = { ...this.state.answers, [_id]: oldAnswers };
        this.setState({ answers: newanswers });

        break;
      }
      case 4: {
        // check if question id exist
        let oldAnswers = [];
        const value = target;
        if (Object.prototype.hasOwnProperty.call(answers, _id)) {
          oldAnswers = [...this.state.answers[_id]];
        }
        oldAnswers[section] = [value];
        const newanswers = { ...this.state.answers, [_id]: oldAnswers };
        this.setState({ answers: newanswers });
        break;
      }
      default:
        break;
    }
  }

  upQ() {
    let { nowShow, questions } = this.state;
    const total = questions.length;
    nowShow += 1;
    if (nowShow > total) {
      nowShow = total - 1;
    }
    this.setState({ nowShow });
  }

  downQ() {
    let { nowShow } = this.state;
    nowShow -= 1;
    if (nowShow < 0) {
      nowShow = 0;
    }
    this.setState({ nowShow });
  }

  submitQuiz() {
    const { eid, mat } = this.props;
    const { answers, started, questions } = this.state;
    if (Object.keys(answers).length !== questions.length) {
      this.props.alertWithType(
        'info',
        'Rethink',
        'Not all questions attempted',
      );
      return;
    }
    this.setState({ isSubmit: true });
    const updoc = {
      material_id: mat._id,
      enrolled_course_id: eid,
      started,
      answers,
    };
    Meteor.call('results.gradequiz', updoc, (error, response) => {
      if (error) {
        this.props.alertWithType('error', 'Error', `${error.reason}`);
        this.setState({ isSubmit: false });
      } else {
        this.setState({ review: true, truth: response });
      }
    });
  }

  renderQuestion() {
    const { review, truth, isSubmit, nowShow, questions } = this.state;
    const q = questions[nowShow];
    return (
      <RenderQuestion
        id={nowShow}
        doc={q}
        qid={q._id}
        answers={this.state.answers[q._id]}
        onChange={this.handleInputChange}
        preview={false}
        review={review}
        truth={truth}
      />
    );
  }
  render() {
    const {
      nowShow,
      isSubmit,
      review,
      truth,
      questions,
      isFetched,
    } = this.state;
    if (!isFetched) {
      return <Loading />;
    }
    const total = questions.length || 0;
    return (
      <View style={styles.container}>
        <View style={styles.navbar}>
          <Button
            title="Previous"
            titleStyle={styles.navTitle}
            icon={<Icon name="chevron-left" type="entypo" />}
            disabled={nowShow === 0}
            onPress={() => this.downQ()}
            disabledStyle={{ opacity: 0 }}
            clear
          />
          <Text style={styles.title}>{`${nowShow + 1} of ${total}`}</Text>
          <Button
            title="Next"
            titleStyle={styles.navTitle}
            iconRight
            icon={<Icon name="chevron-right" type="entypo" />}
            disabled={nowShow === total - 1}
            onPress={() => this.upQ()}
            disabledStyle={{ opacity: 0 }}
            clear
          />
        </View>
        {this.renderQuestion()}
        {review ? (
          <View style={styles.footer}>
            <Text style={styles.footerText}>{`Score: ${truth.length}`}</Text>
          </View>
        ) : (
            <Button
              title="Submit"
              titleStyle={styles.footerText}
              buttonStyle={styles.footer}
              disabled={isSubmit || review}
              loading={isSubmit}
              onPress={() => this.submitQuiz()}
            />
          )}
      </View>
    );
  }
}

QuizView.propTypes = {
  loading: PropTypes.bool,
  eid: PropTypes.string,
  mat: PropTypes.object,
  alertWithType: PropTypes.func,
};

export default withNavigation(connectAlert(QuizView));
