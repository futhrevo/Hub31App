import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    padding: 0,
    width: 150,
    height: 200,
    backgroundColor: '$lightAccent',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginLeft: 5,
    marginRight: 5,
  },
  imageStyle: {
    height: 100,
  },
  text: {
    marginBottom: 10,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 30,
  },
});

export default styles;
