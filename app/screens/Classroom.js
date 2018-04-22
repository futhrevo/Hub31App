import React from 'react';
import { StatusBar, Text } from 'react-native';

import { Container } from '../components/Container';
// import { CourseChapter } from '../components/CourseChapter';
// import { DocumentView } from '../components/DocumentView';
import { VideoView } from '../components/VideoView';

export default () => (
  <Container>
    <StatusBar translucent={false} barStyle="light-content" />
    <VideoView />
  </Container>
);
