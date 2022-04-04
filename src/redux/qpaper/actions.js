import { getPaperAll } from '../../api/questionpapers';
/*
 * action types
 */
export const FETCH_PAPER_PENDING = 'FCH_PAP_PEN';
export const FETCH_PAPER_SUCCESS = 'FCH_PAP_OK';
export const FETCH_PAPER_ERROR = 'FCH_PAP_ERR';
export const UPDATE_PAPER = 'UPD_PAPER';
export const UPDATE_QUES = 'UPD_QUES';
export const REMOVE_PAPER = 'RM_PAP';
export const ADD_QUES = 'ADD_Q';
export const REMOVE_QUES = 'RM_Q';
export const INIT_SELECTED = 'INT_SEL';
export const ADD_SELECTEDID = 'ADD_SEL';
export const RM_SELECTEDID = 'RM_SEL';
export const UP_SELECTEDID = 'UP_SEL';
export const DOWN_SELECTEDID = 'DN_SEL';

/*
 * action creators
 */
export function fetchPaperPending(id) {
  return { type: FETCH_PAPER_PENDING, id }
}

export function fetchPaperSuccess(id, data) {
  return { type: FETCH_PAPER_SUCCESS, data }
}

export function fetchPaperError(id, error) {
  return { type: FETCH_PAPER_ERROR, id, error }
}

export function updatePaper(id, data) {
  return { type: UPDATE_PAPER, id, data }
}

export function removePaper() {
  return { type: REMOVE_PAPER };
}

export function addQues(qid) {
  return { type: ADD_QUES, qid }
}

export function updateQues(qid, data) {
  return { type: UPDATE_QUES, qid, data }
}

export function removeQues(qid) {
  return { type: REMOVE_QUES, qid }
}

export function initSelected() {
  return { type: INIT_SELECTED };
}

export function addSelected(question) {
  return { type: ADD_SELECTEDID, question };
}

export function removeSelected(question) {
  return { type: RM_SELECTEDID, question };
}

export function upSelected(id) {
  return { type: UP_SELECTEDID, id }
}

export function downSelected(id) {
  return { type: DOWN_SELECTEDID, id }
}
/* thunk actions */
export function fetchPaperDetails(pid, unused) {
  return async dispatch => {
    dispatch(fetchPaperPending(pid));
    try {
      const data = await getPaperAll(pid, unused);
      dispatch(fetchPaperSuccess(pid, data));
      dispatch(initSelected());
    } catch (error) {
      dispatch(fetchPaperError(pid, error));
    }
  }
}

export function addQuestionInPaper(pid, question) {
  return async dispatch => {
    dispatch(addQues(question.id));
    dispatch(addSelected(question));
  }
}
