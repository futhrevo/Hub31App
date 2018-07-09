import { name as courseName } from './course_details/courses/schema';

import { name as chapterName } from './course_details/chapter/schema';
import { name as encourseName } from './student_participation/encourse/schema';

import { SUCCESSJOINED, FETCHEDJOINED } from '../ui/home/action';

const DataReducer = (state = {}, action) => {
  switch (action.type) {
    case SUCCESSJOINED:
      return {
        ...state,
        [courseName]: action.data[courseName],
        [chapterName]: action.data[chapterName],
        [encourseName]: action.data[encourseName],
      };
    case FETCHEDJOINED:
      return {
        ...state,
        [courseName]: action.data[courseName],
        [encourseName]: action.data[encourseName],
      };
    default:
      return state;
  }
};

export default DataReducer;
