import { createContext, useContext } from 'react';
import { CourseInfo } from '../../../redux/courses/reducer';
import { CSessionType } from '../../../redux/courses/sessionReducer';

type CourseState = {
  edit: boolean;
  course?: CourseInfo,
  sessions?: CSessionType
}

type CourseActions = {
  toggleEdit?: (x: boolean) => void
}

type CourseContextType = {
  state: CourseState,
  actions: CourseActions
}
export const CourseContext = createContext<CourseContextType>({ state: { edit: false }, actions: {} });

export const useCourse = () => useContext(CourseContext);

