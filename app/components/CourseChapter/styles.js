import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  specText: {
    textAlign: 'center',
    fontSize: '1rem',
    fontWeight: 'bold',
    margin: 10,
    color: '$darkText',
  },
  divider: {
    backgroundColor: '$positive',
    width: '86%',
    alignSelf: 'center',
  },
});

export default styles;
