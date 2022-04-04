import { listForums } from '../../api/forums';
/*
 * action types
 */
export const ADD_FORUM = "ADD_FOR";
export const FETCH_FORUM_PENDING = 'FCH_FOR_PEN';
export const FETCH_FORUM_SUCCESS = 'FCH_FOR_SUC';
export const FETCH_FORUM_ERROR = 'FCH_FOR_ERR';


/*
* action creators
*/
export function actaddForum(courseId) {
  const Item = {
    courseId,
    title: 'Course Forum',
    slug: 'general',
    postC: 0,
  }
  return { type: ADD_FORUM, courseId, Item };
}

function fetchForumPending(courseId) {
  return { type: FETCH_FORUM_PENDING, courseId }
}

export function fetchForumSuccess(courseId, forums) {
  if (forums.length === 0) {
    return { type: FETCH_FORUM_ERROR, courseId }
  }
  return { type: FETCH_FORUM_SUCCESS, courseId, forum: forums[0] }
}

function fetchForumError(courseId, error) {
  return { type: FETCH_FORUM_ERROR, courseId, error }
}
/* thunk actions */
export function fetchCourseForum(courseId) {
  return async (dispatch, getState) => {
    const { fetch } = getState()?.Courses[courseId]?.Forums ?? {};
    if (fetch) {
      return;
    }
    dispatch(fetchForumPending(courseId));
    try {
      const details = await listForums(courseId);
      dispatch(fetchForumSuccess(courseId, details));
    } catch (error) {
      dispatch(fetchForumError(courseId, error));
    }
  }
}
