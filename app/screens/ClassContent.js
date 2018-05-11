import React from 'react';
import { StatusBar, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';
import Meteor, { createContainer } from 'react-native-meteor';
import _ from 'underscore';

import { Container } from '../components/Container';
import { Loading } from '../components/Loading';
import { NoData } from '../components/NoData';

import { DocumentView } from '../components/DocumentView';
import { QuizView } from '../components/QuizView';
import { VideoView } from '../components/VideoView';

class ClassContent extends React.Component {
  static navigationOptions = {
    headerRight: <Button onPress={() => alert('This is a button!')} title="SKIP" clear />,
  };

  constructor(props) {
    super(props);
    this.state = {
      matId: props.navigation.getParam('matId', ''),
    };
    this.renderContent = this.renderContent.bind(this);
  }

  renderContent() {
    const {
      error, loading, mats, eid,
    } = this.props;
    const { matId } = this.state;
    if (error) {
      return <NoData msg="Course Info not found" />;
    }
    if (loading) {
      return <Loading />;
    }
    let mat = mats[0];
    mat = _.find(mats, (item) => item._id === matId);
    /* 2. Read the params from the navigation state */
    const mType = mat ? mat.material_type : null;
    switch (mType) {
      case 0:
        return <QuizView mat={mat} eid={eid} />;
      case 1:
        return <VideoView mat={mat} eid={eid} />;
      case 2:
        return <DocumentView mat={mat} eid={eid} />;
      default:
        return <Text>Internal Error</Text>;
    }
  }
  render() {
    return (
      <Container>
        <StatusBar translucent={false} barStyle="light-content" />
        {this.renderContent()}
      </Container>
    );
  }
}

ClassContent.propTypes = {
  navigation: PropTypes.object,
  error: PropTypes.bool,
  loading: PropTypes.bool,
  mats: PropTypes.array,
  eid: PropTypes.string,
};

export default createContainer((props) => {
  const { navigation } = props;
  const courseId = navigation.getParam('courseId', '');
  const chapterId = navigation.getParam('chapterId', '');
  const eid = navigation.getParam('eid', '');

  if (courseId === '' || chapterId === '' || eid === '') {
    return { error: true };
  }
  const materialsub = Meteor.subscribe('materials.view', courseId);
  const resultsSub = Meteor.subscribe('sturesults.view', courseId);

  return {
    loading: !materialsub.ready() && !resultsSub.ready(),
    mats: Meteor.collection('Materials').find(
      { chapter_id: chapterId },
      { sort: { material_no: 1 } },
    ),
    eid,
  };
}, ClassContent);
