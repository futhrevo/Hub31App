import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    padding: 0,
    width: 150,
    height: 200,

    // borderBottomLeftRadius: 15,
    // borderBottomRightRadius: 15,
    marginLeft: 5,
    marginRight: 5,
  },
  imageStyle: {
    height: 100,
  },
  text: {
    marginBottom: 10,
    color: '$darkText',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 30,
  },
  containerHeader: {
    justifyContent: 'center',
    marginLeft: 10,
    backgroundColor: '$lightAccent',
  },
  textHeader: {
    color: 'white',
  },
});

export default styles;
