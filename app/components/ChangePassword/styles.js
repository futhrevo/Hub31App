import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '$lightAccent',
    borderRadius: 10,
    height: 50,
    width: 200,
  },
  formContainer: {
    flex: 1,
  },
});

export default styles;
