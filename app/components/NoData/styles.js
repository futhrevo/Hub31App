import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    margin: 14,
  },
  msg: {
    margin: 10,
    color: '$tetra1',
    textAlign: 'center',
    fontSize: '1rem',
  },
});

export default styles;
