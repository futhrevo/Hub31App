import React from 'react';
import { StatusBar } from 'react-native';

import { Container } from '../components/Container';
import { CourseChapter } from '../components/CourseChapter';

export default () => (
  <Container>
    <StatusBar translucent={false} barStyle="light-content" />
    <CourseChapter />
  </Container>
);
