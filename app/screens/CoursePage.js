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
        <StatusBar translucent backgroundColor="rgba(0, 0, 0, 0.24)" animated />
        <CourseView documentId={id} specId={spec} />
      </Container>
    );
  }
}

CoursePage.propTypes = {
  navigation: PropTypes.object,
};

export default CoursePage;
