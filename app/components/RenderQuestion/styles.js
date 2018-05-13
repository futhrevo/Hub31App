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
    backgroundColor: 'aliceblue',
    padding: 4,
    borderLeftWidth: 6,
    borderLeftColor: '$lightAccent',
    borderStyle: 'solid',
  },
  renderTrue: {
    backgroundColor: '#b3ffb3',
    borderLeftColor: 'green',
  },
  renderFalse: {
    backgroundColor: '#ffcccc',
    borderLeftColor: 'red',
  },
});

export default styles;
