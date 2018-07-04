import { mviewJoinedVerb } from './home';

export const SUCCESSJOINED = 'SUCCESSJOINED';
export const successJoined = (data) => {
  return {
    type: SUCCESSJOINED,
    data,
  };
};

export const ERRORJOINED = 'ERRORJOINED';
export const errorJoined = (error) => {
  return {
    type: ERRORJOINED,
    error,
  };
};

export const LOADINGJOINED = 'LOADINGJOINED';
export const loadingJoined = () => {
  return {
    type: LOADINGJOINED,
  };
};

export function getJoinedCourses() {
  return (dispatch) => {
    mviewJoinedVerb(dispatch);
  };
}
