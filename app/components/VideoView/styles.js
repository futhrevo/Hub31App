import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  specText: {
    textAlign: 'center',
    fontSize: '1rem',
    fontWeight: 'bold',
    margin: 10,
    color: '$darkText',
  },
  iphonex: {
    width: '100%',
    height: 22,
    backgroundColor: 'black',
  },
});

export default styles;
