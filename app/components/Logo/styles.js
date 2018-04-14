import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const imageWidth = Dimensions.get('window').width / 3;

const styles = EStyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    flex: 1,
  },
  logobox: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '$positive',
    borderRadius: 16,
    '@media ios': {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 15 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
    },
    '@media android': {
      elevation: 15,
    },
  },
  logoImage: {
    width: imageWidth,
    height: imageWidth,
  },
});

export default styles;
