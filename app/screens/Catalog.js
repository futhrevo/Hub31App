import React from 'react';
import { StatusBar } from 'react-native';

import { Container } from '../components/Container';
// import { CourseTile } from '../components/CourseTile';
import { CourseLists } from '../components/CourseLists';

export default () => (
  <Container>
    <StatusBar translucent={false} barStyle="light-content" />
    <CourseLists />
  </Container>
);
