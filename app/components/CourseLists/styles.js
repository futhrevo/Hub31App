import EStyleSheet from 'react-native-extended-stylesheet';
import { normalize } from 'react-native-elements';

const styles = EStyleSheet.create({
  titleStyle: {
    fontSize: normalize(22),
    margin: 10,
    fontWeight: 'bold',
  },
});

export default styles;
