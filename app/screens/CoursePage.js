import React from 'react';
import { StatusBar } from 'react-native';

import { Container } from '../components/Container';
import { CourseView } from '../components/CourseView';

export default () => (
  <Container>
    <StatusBar translucent={false} barStyle="light-content" />
    <CourseView />
  </Container>
);
