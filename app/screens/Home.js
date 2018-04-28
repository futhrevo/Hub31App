import React from 'react';
import { StatusBar } from 'react-native';

import { Container } from '../components/Container';
import { MyCourses } from '../components/MyCourses';

class Home extends React.Component {
  static navigationOptions = {
    title: 'My Courses',
  };

  render() {
    return (
      <Container safe>
        <StatusBar translucent={false} barStyle="light-content" />
        <MyCourses />
      </Container>
    );
  }
}

export default Home;
