export const ADD_CHAPTER = 'ADD_CHAP';
export const UPDATE_CHAPTER = 'UPD_CHAP';
export const DELETE_CHAPTER = 'DEL_CHAP';
export const UP_CHAPTER = 'UP_CHAP';
export const DOWN_CHAPTER = 'DOW_CHAP';

/*
 * action creators
 */
export function addChapter(id, courseId, data) {
  data.id = id;
  return { type: ADD_CHAPTER, courseId, data };
}

export function updateChapter(id, courseId, data) {
  return { type: UPDATE_CHAPTER, id, courseId, data };
}

export function deleteChapter(courseId, id) {
  return { type: DELETE_CHAPTER, id, courseId };
}

export function upChapter(id, courseId, index) {
  return { type: UP_CHAPTER, id, courseId, index };
}

export function downChapter(id, courseId, index) {
  return { type: DOWN_CHAPTER, id, courseId, index };
}

/*
 * Action reducer Helpers
 */
export function addChapterHelper(chapters, data) {
  return [...chapters, data];
}

export function updateChapterHelper(chapters, id, data) {
  return chapters.map((chapter) => {
    if (chapter.id !== id) {
      return chapter;
    }
    return {
      ...chapter,
      ...data
    }
  })
}

export function deleteChapterHelper(chapters, id) {
  return chapters.map((chapter) => {
    // find exact location and toggle flag
    if (chapter.id === id) {
      return null;
    }
    return chapter;
  }).filter(Boolean);
}

export function upChapterhelper(chapters, id, index) {
  let newArray = chapters.slice()
  // if first element then no op
  if (index !== 0) {
    [newArray[index - 1], newArray[index]] = [newArray[index], newArray[index - 1]];
  }
  return newArray;
}

export function downChapterHelper(chapters, id, index) {
  let newArray = chapters.slice()
  // if first element then no op
  if (index !== chapters.length - 1) {
    [newArray[index + 1], newArray[index]] = [newArray[index], newArray[index + 1]];
  }
  return newArray;
}
