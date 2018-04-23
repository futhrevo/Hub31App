import React from 'react';
import { ScrollView, Text } from 'react-native';

import { Container } from '../Container';
import { VideoPlayer } from '../VideoPlayer';
import styles from './styles';

class VideoView extends React.Component {
  state = {};
  render() {
    return (
      <Container>
        <VideoPlayer debug />
        <ScrollView>
          <Text style={styles.specText}> React Native Video </Text>
        </ScrollView>
      </Container>
    );
  }
}

export default VideoView;
