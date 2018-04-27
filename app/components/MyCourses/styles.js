import EStyleSheet from 'react-native-extended-stylesheet';
import { Constants } from 'expo';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  containerStyle: {
    borderColor: '$lightAccent',
    height: 30,
  },
  selectedButtonStyle: {
    backgroundColor: '$lightAccent',
  },
  textStyle: {
    color: '$lightAccent',
    fontWeight: '900',
  },
});

export default styles;
