import { listPosts, listPinned, getPost } from '../../api/posts';
/*
 * action types
 */
export const FETCH_PIN_PENDING = 'FCH_PIN_PEN'
export const FETCH_PIN_SUCCESS = 'FCH_PIN_SUC';
export const FETCH_PIN_ERROR = 'FCH_PIN_ERR';

export const FETCH_POST_PENDING = 'FCH_PST_PEN';
export const FETCH_POST_SUCCESS = 'FCH_PST_SUC';
export const FETCH_POST_ERROR = 'FCH_PST_ERR';

export const FETCH_1PIN_SUCCESS = 'FCH_1PIN_SUC';
export const FETCH_1POST_SUCCESS = 'FCH_1PST_SUC';

export const ADD_POST = 'ADD_POST';
export const UPDATE_POST = 'UPD_POST';
export const DEL_POST = 'DEL_POST';

/*
* action creators
*/
function fetchPinPending(courseId, slug) {
  return { type: FETCH_PIN_PENDING, courseId, slug }
}

function fetchPinSuccess(courseId, slug, items, last) {
  return { type: FETCH_PIN_SUCCESS, courseId, slug, items, last }
}

function fetchPinError(courseId, slug, error) {
  return { type: FETCH_PIN_ERROR, courseId, slug }
}

function fetchPostPending(courseId, slug) {
  return { type: FETCH_POST_PENDING, courseId, slug }
}

function fetchPostSuccess(courseId, slug, items, last) {
  return { type: FETCH_POST_SUCCESS, courseId, slug, items, last }
}

function fetchPostError(courseId, slug, error) {
  return { type: FETCH_POST_ERROR, courseId, slug }
}

function fetch1PinSuccess(courseId, slug, pslug, item) {
  return { type: FETCH_1PIN_SUCCESS, courseId, slug, pslug, item }
}

function fetch1PostSuccess(courseId, slug, pslug, item) {
  return { type: FETCH_1POST_SUCCESS, courseId, slug, pslug, item }
}

export function addPostAction(courseId, slug, pslug, item) {
  return { type: ADD_POST, courseId, slug, pslug, item }
}

export function updatePostAction(courseId, slug, pslug, item) {
  return { type: UPDATE_POST, courseId, slug, pslug, item }
}

export function deletePostAction(courseId, slug, pslug) {
  return { type: DEL_POST, courseId, slug, pslug }
}

/* thunk actions */
export function fetchPinnedPosts(courseId, slug, lastkey = null) {
  return async (dispatch, getState) => {
    const { pinfetch } = (getState()?.Courses[courseId]?.Forums?.byId[slug]?.Posts ?? {});
    if (pinfetch && lastkey == null) {
      return;
    }
    dispatch(fetchPinPending(courseId, slug));
    try {
      const { items, lastItem } = await listPinned(`${courseId}_${slug}`, lastkey);
      dispatch(fetchPinSuccess(courseId, slug, items, lastItem));
    } catch (error) {
      dispatch(fetchPinError(courseId, slug, error));
    }
  }
}

export function fetchPosts(courseId, slug, lastkey = null, time = true, dir = true) {
  return async (dispatch, getState) => {
    const { postfetch } = (getState()?.Courses[courseId]?.Forums?.byId[slug]?.Posts ?? {});
    if (postfetch && lastkey == null) {
      return;
    }
    dispatch(fetchPostPending(courseId, slug));
    try {
      const { items, lastItem } = await listPosts(`${courseId}_${slug}`, lastkey, time, dir);
      dispatch(fetchPostSuccess(courseId, slug, items, lastItem));
    } catch (error) {
      dispatch(fetchPostError(courseId, slug, error));
    }
  }
}

export function fetchPost(courseId, fslug, pslug) {
  return async (dispatch, getState) => {
    const id = getState()?.Courses[courseId]?.Forums?.byId[fslug]?.Posts?.byId[pslug] ?? 0;
    if (id > 0) return;
    try {
      const forum = `${courseId}_${fslug}`;
      const items = await getPost(forum, pslug);
      if (items.length === 0) return;
      const item = items[0];
      if (item.pinned && item.pinned > 0) {
        dispatch(fetch1PinSuccess(courseId, fslug, pslug, item));
      } else {
        dispatch(fetch1PostSuccess(courseId, fslug, pslug, item));
      }
    } catch (error) {

    }
  }
}
