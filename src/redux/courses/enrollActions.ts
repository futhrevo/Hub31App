import type { MatResultType } from './enrollReducer';
export const MAT_READ_DOC = 'MAT_READ_DOC';

// actions
export function readDocAction(courseId: string, chapterId: string, matId: string, result: MatResultType) {
  return { type: MAT_READ_DOC, courseId, chapterId, matId, result };
}
