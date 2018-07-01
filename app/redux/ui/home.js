import Meteor from 'react-native-meteor';

class Utils {
  _writeJoinedCourses = () => {};
  _writeEnrolledCourses = () => {};
  _writeJoinedChapters = () => {};
  mviewJoinedVerb = () => {
    Meteor.call('courses.mviewJoinedVerb', (error, response) => {
      if (error) {
        // TODO: error dispatch
      } else {
        if (Object.prototype.hasOwnProperty.call(response, 'Courses')) {
          this._writeJoinedCourses(response.Courses);
        }
        if (Object.prototype.hasOwnProperty.call(response, 'EnCourses')) {
          this._writeEnrolledCourses(response.EnCourses);
        }
        if (Object.prototype.hasOwnProperty.call(response, 'Chapters')) {
          this._writeJoinedChapters(response.Chapters);
        }
      }
    });
  };
}

export default Utils;
