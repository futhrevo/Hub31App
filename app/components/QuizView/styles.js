import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    paddingBottom: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navTitle: {
    color: '$darkText',
  },
  footer: {
    width: '100%',
    height: 50,
    backgroundColor: '$positive',
    alignItems: 'center',
    justifyContent: 'center',
    '@media ios': {
      shadowOffset: { width: 3, height: 3 },
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
  title: {
    color: '$darkText',
    fontSize: 16,
    textAlign: 'center',
    padding: 8,
    fontWeight: '500',
  },
});

export default styles;
