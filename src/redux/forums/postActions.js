/*
 * action types
 */
export const FAV_POST = 'FAV_POST';
export const COMM_COUNT = 'COM_CNT';

/*
* action creators
*/

export function favPostAction(courseId, slug, pslug, fav) {
  return { type: FAV_POST, courseId, slug, pslug, fav }
}

export function updCommCountAction(courseId, slug, pslug, isInc) {
  return { type: COMM_COUNT, courseId, slug, pslug, isInc }
}
/* thunk actions */



