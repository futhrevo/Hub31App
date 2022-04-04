import { listLives } from '../../api/rtc';

export const FETCH_LIVES_PENDING = 'FCH_LIVS_PEN';
export const FETCH_LIVES_SUCCESS = 'FCH_LIVS_SUC';
export const FETCH_LIVES_ERROR = 'FCH_LIVS_ERR';
export const FETCH_LIVES_NEXT_PENDING = 'FCH_LIVS_NXT_PEN';
export const FETCH_LIVES_NEXT = 'FCH_LIVS_NXT';
export const ADD_NEW_LIVE = 'ADD_NEW_LIVE';



export function buildRtcRoomId(cAt) {
  return `room_${cAt}`;
}

export function parseRtcRoomId(id) {
  return id.split('_')[1];
}

export function fetchLives(courseId) {
  return async (dispatch, getState) => {
    const { fetched, last, pagination: { total } } = getState().Courses[courseId].Lives;
    const next = total + 1;
    if (fetched && last === null) return;
    dispatch({ type: `${last === null ? FETCH_LIVES_PENDING : FETCH_LIVES_NEXT_PENDING}`, courseId, next });
    try {
      const { items, lastItem } = await listLives(courseId, last);
      if (last === null) {
        // first page
        dispatch({ type: FETCH_LIVES_SUCCESS, courseId, items, lastItem, next });
      } else {
        dispatch({ type: FETCH_LIVES_NEXT, courseId, items, lastItem, next });
      }
    } catch (error) {
      dispatch({ type: FETCH_LIVES_ERROR, courseId, error, next });
    }
  }
}
