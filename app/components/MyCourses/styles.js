import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  containerStyle: {
    borderColor: '$lightAccent',
    height: 30,
    marginTop: 15,
  },
  selectedButtonStyle: {
    backgroundColor: '$lightAccent',
  },
  textStyle: {
    color: '$lightAccent',
    fontWeight: '900',
  },
});

export default styles;
