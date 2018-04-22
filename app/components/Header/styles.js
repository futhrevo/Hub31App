import EStyleSheet from 'react-native-extended-stylesheet';
import { Constants } from 'expo';

const styles = EStyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    backgroundColor: '$positive',
    paddingTop: Constants.statusBarHeight,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    elevation: 4,
    zIndex: 99,
  },
  header: {
    fontSize: 18,
    fontWeight: '500',
    marginVertical: 20,
    color: '$lightContent',
  },
});

export default styles;
