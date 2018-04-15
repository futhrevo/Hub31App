import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const imageWidth = Dimensions.get('window').width / 3;

const styles = EStyleSheet.create({
  $smallImageSize: imageWidth / 2,
  $largeImageSize: imageWidth,
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
      shadowColor: 'white',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 1,
      shadowRadius: 16,
    },
    '@media android': {
      elevation: 15,
    },
  },
  logoImage: {
    width: '$largeImageSize',
    height: '$largeImageSize',
  },
});

export default styles;
