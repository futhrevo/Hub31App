import EStyleSheet from 'react-native-extended-stylesheet';

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
  imageStylePort: {
    width: 100,
  },
  titleStyle: {
    color: '$lightContent',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
    marginLeft: 8,
    marginRight: 8,
  },
  featuredSubtitleStyle: {
    color: '$lightContent',
    fontSize: '1rem',
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
    marginLeft: 8,
    marginRight: 8,
  },
});

export default styles;
