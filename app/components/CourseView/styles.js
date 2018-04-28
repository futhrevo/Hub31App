import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
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
      shadowOffset: { width: 4, height: 4 },
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
