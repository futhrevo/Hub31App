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
    const course = this.props.navigation.getParam('course', {});

    return (
      <Container>
        <StatusBar translucent backgroundColor="rgba(0, 0, 0, 0.24)" animated />
        <CourseView course={course} />
      </Container>
    );
  }
}

CoursePage.propTypes = {
  navigation: PropTypes.object,
};

export default CoursePage;
