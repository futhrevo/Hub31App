export const ADD_MATERIAL = 'ADD_MAT';
export const ADD_BULK_MATERIALS = 'BLK_MAT';
export const UPDATE_MATERIAL = 'UPD_MAT';
export const DELETE_MATERIAL = 'DEL_MAT';
export const UP_MATERIAL = 'UP_MAT';
export const DOWN_MATERIAL = 'DOW_MAT';

/*
 * action creators
 */
export function addMaterial(id, chapterId, courseId, data) {
  data.id = id;
  return { type: ADD_MATERIAL, chapterId, courseId, data };
}

export function addBulkMaterials(chapterId, courseId, mats) {
  return { type: ADD_BULK_MATERIALS, chapterId, courseId, mats };
}

export function updateMaterial(id, chapterId, courseId, data) {
  return { type: UPDATE_MATERIAL, id, chapterId, courseId, data };
}

export function deleteMaterial(id, chapterId, courseId) {
  return { type: DELETE_MATERIAL, id, chapterId, courseId };
}

export function upMaterial(id, chapterId, courseId, index) {
  return { type: UP_MATERIAL, id, chapterId, courseId, index };
}

export function downMaterial(id, chapterId, courseId, index) {
  return { type: DOWN_MATERIAL, id, chapterId, courseId, index };
}

/*
 * Action reducer Helpers
 */
export function addMaterialHelper(materials = [], data) {
  return [...materials, data];
}

export function updateMaterialHelper(materials, id, data) {
  return materials.map((material) => {
    if (material.id !== id) {
      return material;
    }
    return {
      ...material,
      ...data
    }
  })
}

export function deleteMaterialHelper(materials, id) {
  return materials.map((material) => {
    // find exact location and toggle flag
    if (material.id === id) {
      return null;
    }
    return material;
  }).filter(Boolean);
}

export function upMaterialhelper(materials, id, index) {
  let newArray = materials.slice()
  // if first element then no op
  if (index !== 0) {
    [newArray[index - 1], newArray[index]] = [newArray[index], newArray[index - 1]];
  }
  return newArray;
}

export function downMaterialHelper(materials, id, index) {
  let newArray = materials.slice()
  // if first element then no op
  if (index !== materials.length - 1) {
    [newArray[index + 1], newArray[index]] = [newArray[index], newArray[index + 1]];
  }
  return newArray;
}

export function addMaterialResults(oldResults, newresults) {
  const results = newresults.reduce(function (obj, v) {
    obj[v.materialid] = v;
    return obj;
  }, {});
  return { ...oldResults, ...results };
}
