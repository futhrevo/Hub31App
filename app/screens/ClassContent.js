import React from 'react';
import { StatusBar, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';

import { Container } from '../components/Container';
import { DocumentView } from '../components/DocumentView';
import { QuizView } from '../components/QuizView';
import { VideoView } from '../components/VideoView';

class ClassContent extends React.Component {
  static navigationOptions = {
    headerRight: <Button onPress={() => alert('This is a button!')} title="SKIP" clear />,
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.renderContent = this.renderContent.bind(this);
  }

  renderContent() {
    /* 2. Read the params from the navigation state */
    const { params } = this.props.navigation.state;
    const mType = params ? params.materialType : null;
    switch (mType) {
      case 0:
        return <QuizView />;
      case 1:
        return <VideoView />;
      case 2:
        return <DocumentView />;
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
};

export default ClassContent;
