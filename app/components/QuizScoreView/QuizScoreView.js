import React, { Component } from 'react';
import { Card, Button, ListItem } from 'react-native-elements';
import { View } from 'react-native';
import Meteor, { withTracker } from 'meteorjs-client';
import PropTypes from 'prop-types';

import { Loading } from '../Loading';
import { QuizView } from '../QuizView';

import { connectAlert } from '../Alert';
import { NoData } from '../NoData';
import styles from './styles';

class QuizScoreView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showQuiz: false,
      doc: {},
      isFetched: false,
    };
    this.startQuiz = this.startQuiz.bind(this);
  }

  componentDidMount() {
    const { paperId } = this.props;
    Meteor.call('questionPapers.getdoc', paperId, (err, res) => {
      if (err) {
        this.props.alertWithType('error', 'Error', `${err.reason}`);
      } else {
        this.setState({ doc: res, isFetched: true });
      }
    });
  }

  startQuiz() {
    this.setState({ showQuiz: true });
  }

  render() {
    const { loading, res, mat, eid } = this.props;
    const { showQuiz, doc, isFetched } = this.state;

    if (loading) {
      return <Loading />;
    }

    if (!isFetched) {
      return <Loading />;
    }

    if (showQuiz) {
      return <QuizView mat={mat} eid={eid} />;
    }

    if (
      typeof doc !== 'undefined' &&
      !Object.prototype.hasOwnProperty.call(doc, 'questions')
    ) {
      return <NoData msg="Quiz Info not found" />;
    }

    let actiontext = 'Start Quiz';
    let hideAction = false;
    if (
      typeof res !== 'undefined' &&
      Object.prototype.hasOwnProperty.call(res, 'attempt')
    ) {
      actiontext = 'Retake Quiz';
      if (
        typeof doc !== 'undefined' &&
        Object.prototype.hasOwnProperty.call(doc, 'questions')
      ) {
        hideAction = res.score === doc.questions.length;
      }
    }

    return (
      <View style={styles.container}>
        <Card title={doc && doc.title}>
          <ListItem
            title="Questions"
            badge={{
              value: (doc && doc.questions.length) || 0,
              badgeStyle: styles.colored,
            }}
          />
          <ListItem
            title="Score"
            badge={{
              value: (res && res.score) || 'Not started',
              badgeStyle: styles.colored,
            }}
          />
          <ListItem
            title="Attempt"
            badge={{
              value: (res && res.attempt) || 0,
              badgeStyle: styles.colored,
            }}
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
  const paperId = props.mat._id;
  if (typeof paperId === 'undefined') {
    return {
      loading: true,
    };
  }
  return {
    loading: false,
    paperId,
    res:
      Meteor.collection('StuResults').findOne({ material_id: props.mat._id }) ||
      {},
  };
})(connectAlert(QuizScoreView));
