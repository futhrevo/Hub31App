import React from 'react';
import { View, Text } from 'react-native';

import { RenderQuestion } from '../RenderQuestion';

const ques = [
  {
    _id: 'z7yzg6C2eASBvqBPs',
    question: [
      {
        mcqinputs: ['option1', 'option 2', 'option3'],
        question: 'What is Question 1?',
        section: '',
        statement: 'Question 1 statement here',
        optionsIndex: 0,
      },
    ],
    answers: [[1]],
    explain: 'Explanation for question 1 here',
    tags: [],
    createdAt: '2018-03-07T08:24:12.855Z',
    owner: 'yzuH4axR6t9PAZme2',
  },
  {
    _id: 'J7n9sbr8qxuv8DoCk',
    question: [
      {
        mcqinputs: ['option select 1', 'option select 2', 'option select 3'],
        question: 'What is question2 ?',
        section: '',
        statement: 'Statement for question 2 here',
        optionsIndex: 1,
      },
    ],
    answers: [[1, 2]],
    explain: 'Explanation for question 2 here',
    tags: [],
    createdAt: '2018-03-07T08:25:42.245Z',
    owner: 'yzuH4axR6t9PAZme2',
  },
  {
    _id: 'hJ2rMbvYfmkxBMXho',
    question: [
      {
        mcqtable: [['col1', 'col2'], ['row1', 'row2']],
        question: 'What is question 3 ?',
        section: '',
        statement: 'Statement for question 3 here',
        optionsIndex: 2,
      },
    ],
    answers: [[0, 1]],
    explain: 'explanation for question 3',
    tags: [],
    createdAt: '2018-03-07T08:26:50.585Z',
    owner: 'yzuH4axR6t9PAZme2',
  },
  {
    _id: 'hXwqGBjxydakTr9vK',
    question: [
      {
        question: 'What is the question 4?',
        section: '',
        statement: 'statement for question 4',
        optionsIndex: 3,
      },
    ],
    answers: [['answer']],
    explain: 'explanation for question 4',
    tags: [],
    createdAt: '2018-03-07T08:27:29.745Z',
    owner: 'yzuH4axR6t9PAZme2',
  },
];

class QuizView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      material_id: '',
      answers: {},
      started: new Date(),
      review: false,
      truth: [],
      isSubmit: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitQuiz = this.submitQuiz.bind(this);
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
        if (Object.prototype.hasOwnProperty.call(answers, _id)) {
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

  submitQuiz() {
    const { doc, eid, mat } = this.props;
    const { answers, started } = this.state;
    if (Object.keys(answers).length !== doc.questions.length) {
      console.warn('Not all questions attempted', 'danger');
      return;
    }
    this.setState({ isSubmit: true });
    const updoc = {
      material_id: mat._id,
      enrolled_course_id: eid,
      started,
      answers,
    };
    console.log(updoc);
  }

  render() {
    const { review, truth, isSubmit } = this.state;
    const question = ques[3];
    const q = question._id;
    return (
      <View>
        <Text>Hello QuizView</Text>
        <RenderQuestion
          qid={q}
          ques={question}
          val={this.state.answers[q]}
          onChange={this.handleInputChange}
          preview={false}
          review={review}
          truth={truth}
        />
      </View>
    );
  }
}

export default QuizView;
