import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '$lightAccent',
    borderRadius: 10,
    height: 50,
    width: 200,
  },
  loginTextButton: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  loginHelpButtons: {
    fontSize: 14,
    color: 'white',
  },
  footer: {
    width: '90%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  footerButton: {},
  roundInput: {
    marginTop: 20,
    height: 50,
    borderWidth: 2,
    borderColor: '$positive',
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  inputLightStyle: {
    color: 'white',
  },
  inputDarkStyle: {
    color: '$darkText',
  },
  leftIconContainerStyle: {
    width: 28,
  },
  errorInputStyle: {
    color: '$tetra1',
  },
});

export default styles;
