import { AnyAction } from 'redux';
import { FETCH_CL_COURSE_SUCCESS, FETCH_ST_COURSE_SUCCESS, FETCH_COURSE_SUCCESS } from './actions';
import {
  ADD_CHAPTER, UPDATE_CHAPTER, DELETE_CHAPTER, UP_CHAPTER, DOWN_CHAPTER,
  addChapterHelper, updateChapterHelper, deleteChapterHelper, upChapterhelper, downChapterHelper
} from './chapterActions';

export type ChapOutlineItem = {
  id: string;
  desc: string;
  mats: { [x: string]: number };
}


export type ChaptersType = {
  [x: number]: ChapOutlineItem;
}

export const initialState = [];

export function chapterReducer(state: ChaptersType = initialState, action: AnyAction) {
  switch (action.type) {
    case FETCH_COURSE_SUCCESS:
    case FETCH_CL_COURSE_SUCCESS:
    case FETCH_ST_COURSE_SUCCESS: {
      return action.data.Chapters;
    }
    case ADD_CHAPTER: {
      const newChaps = addChapterHelper(state, action.data);
      return newChaps
    }
    case UPDATE_CHAPTER: {
      const newChaps = updateChapterHelper(state, action.id, action.data);
      return newChaps;
    }
    case DELETE_CHAPTER: {
      const newChaps = deleteChapterHelper(state, action.id);
      return newChaps;
    }
    case UP_CHAPTER: {
      const newChaps = upChapterhelper(state, action.id, action.index);
      return newChaps;
    }
    case DOWN_CHAPTER: {
      const newChaps = downChapterHelper(state, action.id, action.index);
      return newChaps;
    }
    default:
      return state;
  }
}
