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
import { QuizScoreView } from '../components/QuizScoreView';
import { VideoView } from '../components/VideoView';

class ClassContentInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matId: props.navigation.getParam('matId', ''),
    };
    this.renderContent = this.renderContent.bind(this);
    this._skipContent = this._skipContent.bind(this);
  }

  componentWillMount() {
    this.props.navigation.setParams({ skipContent: this._skipContent });
  }

  _skipContent = () => {
    const { mats, navigation } = this.props;
    const { matId } = this.state;
    const total = mats.length;
    let index = _.findIndex(mats, (item) => item._id === matId);
    if (index < total - 1) {
      index += 1;
      this.setState({ matId: mats[index]._id });
    } else {
      navigation.goBack();
    }
  };

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
        return <QuizScoreView mat={mat} eid={eid} />;
      case 1:
        return <VideoView mat={mat} eid={eid} />;
      case 2:
        return <DocumentView mat={mat} eid={eid} />;
      default:
        return <Text>Loading . . .</Text>;
    }
  }
  render() {
    return (
      <Container>
        <StatusBar translucent backgroundColor="rgba(0, 0, 0, 0.24)" animated />
        {this.renderContent()}
      </Container>
    );
  }
}

ClassContentInner.propTypes = {
  navigation: PropTypes.object,
  error: PropTypes.bool,
  loading: PropTypes.bool,
  mats: PropTypes.array,
  eid: PropTypes.string,
};

const ClassContent = createContainer((props) => {
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
}, ClassContentInner);

ClassContent.navigationOptions = ({ navigation }) => {
  const { state } = navigation;
  const params = state.params || {};
  const header = state.params && (state.params.fullscreen ? null : undefined);

  return {
    header,
    headerRight: <Button onPress={params.skipContent} title="SKIP" clear />,
  };
};

export default ClassContent;
