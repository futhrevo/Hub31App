import React from 'react';
import { StatusBar } from 'react-native';

import { Container } from '../components/Container';
import { CourseChapter } from '../components/CourseChapter';

class Classroom extends React.Component {
  static navigationOptions = {
    title: 'Outline',
  };

  render() {
    return (
      <Container>
        <StatusBar translucent={false} barStyle="light-content" />
        <CourseChapter />
      </Container>
    );
  }
}

export default Classroom;
