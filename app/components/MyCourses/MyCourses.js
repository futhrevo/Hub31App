import React from 'react';
import { View, LayoutAnimation, UIManager } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

import styles from './styles';
import Joined from './Joined';
import Completed from './Completed';

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

class MyCourses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
    this.updateIndex = this.updateIndex.bind(this);
  }

  updateIndex(selectedIndex) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ selectedIndex });
  }

  renderContent() {
    const { selectedIndex } = this.state;
    if (selectedIndex === 0) {
      return <Joined />;
    }
    return <Completed />;
  }

  render() {
    const buttons = ['JOINED', 'COMPLETED'];
    const { selectedIndex } = this.state;
    return (
      <View style={styles.container}>
        <ButtonGroup
          containerStyle={styles.containerStyle}
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          selectedButtonStyle={styles.selectedButtonStyle}
          textStyle={styles.textStyle}
          underlayColor="white"
        />
        {this.renderContent()}
      </View>
    );
  }
}

export default withNavigation(MyCourses);
