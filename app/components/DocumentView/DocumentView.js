import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

import styles from './styles';

const mock = {
  title: 'Hello World',
  body:
    'Hello world document body with some description.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pulvinar pretium vehicula. Nam ut iaculis lacus, quis facilisis augue. Pellentesque et ipsum eu nibh posuere fermentum. Cras sed pellentesque turpis. Quisque egestas congue finibus. Fusce felis libero, facilisis a consectetur eu, placerat nec justo. Fusce mattis justo nunc, nec volutpat neque posuere venenatis. Nulla pulvinar est eu nunc lobortis faucibus. Nam in iaculis felis, vitae auctor odio. Nam ultrices enim dolor, quis ullamcorper felis aliquet eget. Vivamus at ullamcorper justo, a semper nibh. Vivamus in enim in libero euismod pretium.\n\nNullam libero elit, efficitur rhoncus blandit vel, ultrices at ante. Fusce placerat dictum est, eu congue leo molestie sed. Aenean luctus sapien ac finibus convallis. Sed non metus suscipit, facilisis velit vitae, dictum mi. Nam et viverra velit. Curabitur sed aliquet est. Aliquam accumsan dictum metus, at blandit nisi dictum et. Curabitur eget mauris mi. Cras tempor nulla sit amet feugiat maximus. Quisque diam sem, bibendum et aliquet at, posuere eget sapien. Donec a scelerisque dui.\n\nCurabitur ex sem, volutpat ut euismod in, luctus eget tellus. Quisque elit est, cursus sed mi et, venenatis laoreet dui. Nulla feugiat commodo lectus. Duis non elit tellus. Nunc ut vulputate ligula. Aliquam sed ultricies nunc. Morbi pulvinar leo neque, non egestas augue tincidunt ac. Duis sed dolor eu lacus elementum commodo.',
};

class DocumentView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.body}>
          <Text style={styles.specText}>{mock.title}</Text>
          <Text style={styles.paragraph}>{mock.body}</Text>
          <Button buttonStyle={styles.actionBtn} title="Mark as Complete" />
        </View>
      </ScrollView>
    );
  }
}

export default withNavigation(DocumentView);

/** 
        <View style={styles.navbar}>
          <Button
            title="Previous"
            titleStyle={styles.navTitle}
            icon={<Icon name="chevron-left" type="entypo" />}
            clear
          />
          <Button
            title="Next"
            titleStyle={styles.navTitle}
            iconRight
            icon={<Icon name="chevron-right" type="entypo" />}
            clear
          />
        </View>
**/