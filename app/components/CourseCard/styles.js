import EStyleSheet from 'react-native-extended-stylesheet';
import { normalize } from 'react-native-elements';

const styles = EStyleSheet.create({
  // for CourseCard
  wrapperStyle: {
    padding: 0,
  },
  imageWrapperStyle: {
    // backgroundColor: 'black',
  },
  imageStyle: {
    // opacity: 0.5,
    // tintColor: 'white',
    height: 100,
  },
  titleStyle: {
    color: '$lightContent',
    fontSize: normalize(24),
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
    marginLeft: 8,
    marginRight: 8,
  },
  featuredSubtitleStyle: {
    color: '$lightContent',
    fontSize: normalize(18),
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
    marginLeft: 8,
    marginRight: 8,
  },
});

export default styles;
