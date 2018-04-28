import React from 'react';
import { StatusBar } from 'react-native';

import { Container } from '../components/Container';
import { DocumentView } from '../components/DocumentView';

export default () => (
  <Container>
    <StatusBar translucent={false} barStyle="light-content" />
    <DocumentView />
  </Container>
);
