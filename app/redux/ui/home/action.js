import { mviewJoinedVerb, getJoinedFromRealm } from './home';

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

export const FETCHEDJOINED = 'FETCHEDJOINED';
export const fetchedJoined = (data) => {
  return {
    type: FETCHEDJOINED,
    data,
  };
};

export function fetchJoinedCourses() {
  return (dispatch) => {
    mviewJoinedVerb(dispatch);
  };
}

export function getJoinedCourses() {
  return (dispatch) => {
    getJoinedFromRealm(dispatch);
  };
}
