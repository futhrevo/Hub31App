import React from 'react';
import { StatusBar } from 'react-native';

import { Container } from '../components/Container';
import { CourseView } from '../components/CourseView';

class CoursePage extends React.Component {
  static navigationOptions = {
    title: 'Course Info',
  };

  render() {
    return (
      <Container>
        <StatusBar translucent={false} barStyle="light-content" />
        <CourseView />
      </Container>
    );
  }
}

export default CoursePage;
