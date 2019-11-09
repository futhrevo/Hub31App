import React, { Component } from 'react';
import { Card, Button, ListItem } from 'react-native-elements';
import { View } from 'react-native';
import Meteor, { withTracker } from 'meteorjs-client';
import PropTypes from 'prop-types';

import { Loading } from '../Loading';
import { QuizView } from '../QuizView';

import styles from './styles';

class QuizScoreView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showQuiz: false,
    };
    this.startQuiz = this.startQuiz.bind(this);
  }

  startQuiz() {
    this.setState({ showQuiz: true });
  }

  render() {
    const {
      loading, doc, res, mat, eid,
    } = this.props;
    const { showQuiz } = this.state;
    let actiontext = 'Start Quiz';
    let hideAction = false;
    if (typeof res !== 'undefined' && Object.prototype.hasOwnProperty.call(res, 'attempt')) {
      actiontext = 'Retake Quiz';
      if (typeof doc !== 'undefined' && Object.prototype.hasOwnProperty.call(doc, 'questions')) {
        hideAction = res.score === doc.questions.length;
      }
    }
    if (loading) {
      return <Loading />;
    }

    if (showQuiz) {
      return <QuizView mat={mat} eid={eid} />;
    }

    return (
      <View style={styles.container}>
        <Card title={doc && doc.title}>
          <ListItem
            title="Questions"
            badge={{ value: (doc && doc.questions.length) || 0, containerStyle: styles.colored }}
          />
          <ListItem
            title="Score"
            badge={{ value: (res && res.score) || 'Not started', containerStyle: styles.colored }}
          />
          <ListItem
            title="Attempt"
            badge={{ value: (res && res.attempt) || 0, containerStyle: styles.colored }}
          />
          {hideAction ? null : (
            <Button
              title={actiontext}
              onPress={() => this.startQuiz()}
              buttonStyle={styles.colored}
            />
          )}
        </Card>
      </View>
    );
  }
}

QuizScoreView.propTypes = {
  loading: PropTypes.bool,
  doc: PropTypes.object,
  res: PropTypes.object,
  eid: PropTypes.string,
  mat: PropTypes.object,
};

export default withTracker((props) => {
  const paperId = props.mat.material_link;
  const subscription = Meteor.subscribe('questionpapers.pview', paperId);
  return {
    loading: !subscription.ready(),
    res: Meteor.collection('StuResults').findOne({ material_id: props.mat._id }) || {},
    doc: Meteor.collection('QuestionPapers').findOne({ _id: paperId }) || {},
  };
})(QuizScoreView);
