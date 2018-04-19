import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import { normalize } from 'react-native-elements';

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
  overlayText: {
    backgroundColor: 'rgba(0, 0, 255, 0.5)',
    margin: 10,
  },
  specText: {
    textAlign: 'center',
    fontSize: '1rem',
    fontWeight: 'bold',
    margin: 10,
    color: '$darkText',
  },
  body: {
    margin: 10,
  },
  divider: {
    backgroundColor: 'blue',
    width: '86%',
    alignSelf: 'center',
  },
  paragraph: {
    fontSize: '1rem',
    margin: 10,
    textAlign: 'justify',
  },
  separator: {
    height: 1,
    width: '86%',
    backgroundColor: '#CED0CE',
    alignSelf: 'center',
  },
  footer: {
    width: '100%',
    height: 50,
    backgroundColor: '$positive',
    alignItems: 'center',
    justifyContent: 'center',
    '@media ios': {
      shadowOffset: { width: 10, height: 10 },
      shadowColor: 'black',
      shadowOpacity: 1,
    },
    '@media android': {
      elevation: 3,
    },
  },
  footerText: {
    color: 'white',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
});

export default styles;
