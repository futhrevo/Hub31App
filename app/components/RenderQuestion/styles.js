import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  wrapper: {
    flexDirection: 'row',
  },
  text: { textAlign: 'center' },
  radio: {
    alignItems: 'center',
  },
  qContainer: {
    flexGrow: 1,
    margin: 10,
  },
});

export default styles;
