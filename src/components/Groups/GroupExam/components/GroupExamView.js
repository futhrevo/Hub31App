import React, { Component } from 'react';
import PropTypes from 'prop-types';


import Loading from '../../../Loading';
import ListQuizView from '../../components/Quiz/ListQuizView';

class GroupExamView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      review: false,
      truth: {},
      isSubmit: false,
      marks: 0,
      questions: [],
      isFetched: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    // const { id: groupId } = this.props.group;
    // Meteor.call('questionpapers.group', groupId, (err, res) => {
    //   if (err) {
    //     Bert.alert(err.reason, 'danger');
    //   } else {
    //     this.setState({
    //       questions: res.questions,
    //       isFetched: true,
    //     });
    //   }
    // });
  }

  onSubmit({ answers }) {
    // const { id: quizId } = this.props.quiz;
    // Meteor.call(
    //   'gquiz.grade',
    //   { answered: answers, quizId },
    //   (error, response) => {
    //     if (error) {
    //       Bert.alert(error.reason, 'danger');
    //       this.setState({ isSubmit: false });
    //     } else {
    //       this.setState({
    //         review: true,
    //         truth: response.ans,
    //         marks: response.total,
    //       });
    //     }
    //   },
    // );
  }

  render() {
    const {
      review, truth, isSubmit, marks, isFetched, questions,
    } = this.state;
    if (!isFetched) {
      return <Loading />;
    }
    return (
      <div>
        <ListQuizView
          groupQuiz={this.props.quiz}
          paper={this.props.paper}
          questions={questions}
          marks={marks}
          onSubmit={this.onSubmit}
          review={review}
          truth={truth}
          isSubmit={isSubmit}
        />
      </div>
    );
  }
}

GroupExamView.propTypes = {
  group: PropTypes.object,
  quiz: PropTypes.object,
  paper: PropTypes.object,
};

export default GroupExamView;
