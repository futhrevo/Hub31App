import React from 'react';
import { StatusBar } from 'react-native';
import PropTypes from 'prop-types';

import { Container } from '../components/Container';
import { CourseView } from '../components/CourseView';

class CoursePage extends React.Component {
  static navigationOptions = {
    title: 'Course Info',
  };

  render() {
    const id = this.props.navigation.getParam('_id', '');
    const spec = this.props.navigation.getParam('spec', '');

    return (
      <Container>
        <StatusBar translucent={false} barStyle="light-content" />
        <CourseView documentId={id} specId={spec} />
      </Container>
    );
  }
}

CoursePage.propTypes = {
  navigation: PropTypes.object,
};

export default CoursePage;
