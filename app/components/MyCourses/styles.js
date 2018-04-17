import EStyleSheet from 'react-native-extended-stylesheet';
import { Constants } from 'expo';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  containerStyle: {
    borderColor: '$positive',
    height: 30,
  },
  selectedButtonStyle: {
    backgroundColor: '$positive',
  },
  textStyle: {
    color: '$positive',
    fontWeight: '900',
  },
});

export default styles;
