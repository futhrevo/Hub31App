import {
  FETCH_PAPER_PENDING, FETCH_PAPER_SUCCESS, FETCH_PAPER_ERROR,
  REMOVE_PAPER, ADD_QUES, INIT_SELECTED, ADD_SELECTEDID,
  RM_SELECTEDID, UP_SELECTEDID, DOWN_SELECTEDID, UPDATE_PAPER, UPDATE_QUES
} from './actions';
import { ON_LOGOUT } from '../accounts';

const INITIAL_VALUE = { loading: true, pendingG: 0, paper: { id: '' }, bank: {}, selected: [], unused: [] };

export interface QPaper {
  id: string;
  questions: Array<string>;
  eAt: number;
  userId: string;
  unused: Array<string>;
  dur: number;
  assay: number;
  criteria: number;
  maxAttempts: number;
  title: string;
  uAt: number;
  public: boolean;
}

export interface QPaperResult {
  quizId: string;
  stuId: string;
  courseId: string;
  agg: number;
  ans: { [x: string]: Array<Array<number>> };
  attempt: { [x: string]: any };
  attempts: number;
  ended: number;
  score: number;
  sessUat: number;
  st: number;
  uAt: number;
  fname: string;
}

export interface Question {
  id: string;
  userId: string;
  marks: Array<number>,
  explain: string,
  answers: Array<Array<any>>,
  question: Array<{ question: string, section: string, optionsIndex: number, mcqinputs: Array<string> }>
}
export function qReducer(state = INITIAL_VALUE, action) {
  switch (action.type) {
    case FETCH_PAPER_PENDING:
      return { loading: true };
    case FETCH_PAPER_SUCCESS:
      return {
        paper: action.data.paper, pendingG: action.data.grade, bank: { ...convertArrtoObj(action.data.questions) }, loading: false,
      }
    case FETCH_PAPER_ERROR:
      return {
        loading: false, error: action.error
      }
    case UPDATE_PAPER:
      return {
        ...state,
        paper: { ...state.paper, ...action.data }
      }
    case REMOVE_PAPER:
      return INITIAL_VALUE;
    case ADD_QUES:
      return {
        ...state,
        paper: { ...state.paper, questions: state.paper.questions.concat(action.qid) }
      }
    case UPDATE_QUES:
      return {
        ...state,
        bank: {
          ...state.bank,
          [action.qid]: { ...state.bank[action.qid], ...action.data }
        }
      }
    case INIT_SELECTED:
      return {
        ...state,
        selected: [...(state.paper.questions || [])],
        unused: [...(state.paper.unused || [])]
      }
    case ADD_SELECTEDID:
      return addHelper(state, action.question);
    case RM_SELECTEDID:
      return removeHelper(state, action.question);
    case UP_SELECTEDID:
      return upHelper(state, action.id);
    case DOWN_SELECTEDID:
      return downHelper(state, action.id);
    case ON_LOGOUT:
      return INITIAL_VALUE;
    default:
      return state;
  }
}

function convertArrtoObj(arrayish) {
  let obj = {};
  arrayish.forEach(el => {
    obj[el.id] = el;
  });
  return obj;
}

function addHelper(state, question) {
  const matId = question.id;

  const newquestions = state.unused.slice();
  // remove from unused questions and add to selected
  const index = newquestions.indexOf(matId);
  if (index > -1) {
    newquestions.splice(index, 1);
    return {
      ...state,
      selected: state.selected.concat(matId),
      unused: newquestions,
    }
  } else {
    // check if question is in the bank
    if (Object.keys(state.bank[matId] || {}).length === 0) {
      return {
        ...state,
        selected: state.selected.concat(matId),
        bank: { ...state.bank, [matId]: question }
      }
    }
  }
  return state;
}

function removeHelper(state, question) {
  const isDeleted = (typeof (question) === 'string');
  const matId = isDeleted ? question : question.id;
  const newselected = state.selected.slice();
  // remove from selected and add to unused
  const index = newselected.indexOf(matId);
  newselected.splice(index, 1);
  return {
    ...state,
    ...!isDeleted && { unused: state.unused.concat(matId) },
    selected: newselected,
  }
}

function upHelper(state, qid) {
  const index = state.selected.indexOf(qid);
  // first element no op
  if (index === 0) {
    return state;
  }
  const newArray = state.selected.slice();
  [newArray[index], newArray[index - 1]] = [
    newArray[index - 1],
    newArray[index],
  ];
  return { ...state, selected: newArray }
}

function downHelper(state, qid) {
  const index = state.selected.indexOf(qid);
  // last element no op
  if (index === state.selected.length - 1) {
    return state;
  }
  const newArray = state.selected.slice();
  [newArray[index], newArray[index + 1]] = [
    newArray[index + 1],
    newArray[index],
  ];
  return { ...state, selected: newArray }
}
