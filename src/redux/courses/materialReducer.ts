import { AnyAction } from 'redux';
import { FETCH_CL_COURSE_SUCCESS } from './actions';
import {
  ADD_MATERIAL, ADD_BULK_MATERIALS, UPDATE_MATERIAL, DELETE_MATERIAL, UP_MATERIAL, DOWN_MATERIAL,
  addMaterialHelper, updateMaterialHelper, deleteMaterialHelper, upMaterialhelper, downMaterialHelper,
  // eslint-disable-next-line no-unused-vars
  addMaterialResults,
} from './materialActions';

export type MaterialType = {
  matId: string;
  id: string;
  link: string;
  mtype: number;
  mdy: boolean;
  title: string;
  points: number;
}
export type MaterialsType = {
  [chapId: string]: Array<MaterialType>;
}
export const initialState = {};

export function materialReducer(state: MaterialsType = initialState, action: AnyAction) {
  switch (action.type) {
    case FETCH_CL_COURSE_SUCCESS: {
      return {
        ...state,
        [action.chapterId]: action.data.Materials
      }
    }
    case ADD_MATERIAL: {
      const newMats = addMaterialHelper(state[action.chapterId], action.data);
      return {
        ...state,
        [action.chapterId]: newMats
      }
    }
    case ADD_BULK_MATERIALS: {
      return {
        ...state,
        [action.chapterId]: action.mats
      }
    }
    case UPDATE_MATERIAL: {
      const newMats = updateMaterialHelper(state[action.chapterId], action.id, action.data);
      return {
        ...state,
        [action.chapterId]: newMats
      }
    }
    case DELETE_MATERIAL: {
      const newMats = deleteMaterialHelper(state[action.chapterId], action.id)
      return {
        ...state,
        [action.chapterId]: newMats
      }
    }
    case UP_MATERIAL: {
      const newMats = upMaterialhelper(state[action.chapterId], action.id, action.index);
      return {
        ...state,
        [action.chapterId]: newMats
      }
    }
    case DOWN_MATERIAL: {
      const newMats = downMaterialHelper(state[action.chapterId], action.id, action.index);
      return {
        ...state,
        [action.chapterId]: newMats
      }
    }
    default:
      return state;
  }
}
