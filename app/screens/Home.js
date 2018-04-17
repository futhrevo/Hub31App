import React from 'react';
import { StatusBar, Text } from 'react-native';

import { Container } from '../components/Container';
import { MyCourses } from '../components/MyCourses';

export default () => (
  <Container>
    <StatusBar translucent={false} barStyle="light-content" />
    <Text>Hello World</Text>
    <MyCourses />
  </Container>
);
