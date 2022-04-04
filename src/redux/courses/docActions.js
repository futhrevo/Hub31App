import { getPublicdoc } from '../../api/documents';

export const FETCH_ABT_DOC_PENDING = 'FCH_ADOC_PEND';
export const FETCH_ABT_DOC_SUCCESS = 'FCH_ADOC_SUC';
export const FETCH_ABT_DOC_ERROR = 'FCH_ADOC_ERR';
export const FETCH_RSC_DOC_PENDING = 'FCH_RDOC_PEND';
export const FETCH_RSC_DOC_SUCCESS = 'FCH_RDOC_SUC';
export const FETCH_RSC_DOC_ERROR = 'FCH_RDOC_ERR';
export const FETCH_DES_DOC_PENDING = 'FCH_DDOC_PEND';
export const FETCH_DES_DOC_SUCCESS = 'FCH_DDOC_SUC';
export const FETCH_DES_DOC_ERROR = 'FCH_DDOC_ERR';

export const UPDATE_ABT = 'UPD_ABT';
export const UPDATE_RSC = 'UPD_RSC';
export const UPDATE_DESC = 'UPD_DESC';

export function fetchAbtPending(courseId,) {
  return { type: FETCH_ABT_DOC_PENDING, courseId, };
}

export function fetchAdbtSuccess(courseId, doc) {
  return { type: FETCH_ABT_DOC_SUCCESS, courseId, doc };
}

export function fetchAbtError(courseId, error) {
  return { type: FETCH_ABT_DOC_ERROR, courseId, error };
}

export function fetchDescPending(courseId) {
  return { type: FETCH_DES_DOC_PENDING, courseId, };
}

export function fetchDescSuccess(courseId, doc) {
  return { type: FETCH_DES_DOC_SUCCESS, courseId, doc };
}

export function fetchDescError(courseId, error) {
  return { type: FETCH_DES_DOC_ERROR, courseId, error };
}

export function fetchRscPending(courseId,) {
  return { type: FETCH_RSC_DOC_PENDING, courseId, };
}

export function fetchRscSuccess(courseId, doc) {
  return { type: FETCH_RSC_DOC_SUCCESS, courseId, doc };
}

export function fetchRscError(courseId, error) {
  return { type: FETCH_RSC_DOC_ERROR, courseId, error };
}

export function updateCourseAbout(courseId, body) {
  return { type: UPDATE_ABT, courseId, body };
}

export function updateCourseRsc(courseId, body) {
  return { type: UPDATE_RSC, courseId, body };
}

export function updateCourseDesc(courseId, body) {
  return { type: UPDATE_DESC, courseId, body }
}

export function fetchAboutDoc(courseId,) {
  return async (dispatch, getState) => {
    const { fetched = false } = getState()?.Courses[courseId]?.about ?? {};
    if (fetched) return;
    dispatch(fetchAbtPending(courseId,));
    try {
      const about = await getPublicdoc(courseId, 'abt');
      dispatch(fetchAdbtSuccess(courseId, about));
    } catch (error) {
      dispatch(fetchAbtError(courseId, error));
    }
  }
}

export function fetchRscDoc(courseId,) {
  return async (dispatch, getState) => {
    const { fetched = false } = getState()?.Courses[courseId]?.resources ?? {};
    if (fetched) return;
    dispatch(fetchRscPending(courseId,));
    try {
      const rsc = await getPublicdoc(courseId, 'rsc');
      dispatch(fetchRscSuccess(courseId, rsc));
    } catch (error) {
      dispatch(fetchRscError(courseId, error));
    }
  }
}

export function fetchDescDoc(courseId,) {
  return async (dispatch, getState) => {
    const { fetched = false } = getState()?.Courses[courseId]?.description ?? {};
    if (fetched) return;
    dispatch(fetchDescPending(courseId,));
    try {
      const rsc = await getPublicdoc(courseId, 'desc');
      dispatch(fetchDescSuccess(courseId, rsc));
    } catch (error) {
      dispatch(fetchDescError(courseId, error));
    }
  }
}
