import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  specText: {
    fontSize: '1rem',
    fontWeight: 'bold',
    margin: 10,
    color: '$darkText',
  },
  container: {
    flex: 1,
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
  navbar: {
    paddingBottom: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navTitle: {
    color: '$darkText',
  },
  body: {
    flex: 1,
    backgroundColor: 'aliceblue',
    padding: 4,
    borderLeftWidth: 6,
    borderLeftColor: '$lightAccent',
    borderStyle: 'solid',
  },
  actionBtn: {
    backgroundColor: '$positive',
    margin: 16,
  },
});

export default styles;
