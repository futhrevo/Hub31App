import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

const styles = EStyleSheet.create({
  coverImage: {
    width: '100%',
    height: Dimensions.get('window').width * 0.5,
  },
  overlay: {
    flex: 1,
    // backgroundColor: 'rgba(0, 129, 255, 0.45)',
    justifyContent: 'flex-end',
  },
  overlayText: {
    backgroundColor: 'rgba(0, 0, 255, 0.5)',
    margin: 10,
  },
  title: {
    textAlignVertical: 'center',
    textAlign: 'center',
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    margin: 10,
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
});

export default styles;
