import API from '@aws-amplify/api';
// import { getPayload, countPayload } from '../modules/elastic-utils';

export const TYPE_QUIZ = 0;
export const TYPE_VIDEO = 1;
export const TYPE_DOC = 2;
export const TYPE_QUES = 3;
export const TYPE_COURSE = 4;

function searchAPI(title, userId, TYPE) {
  // const q = `?q=${title}`;
  const payload = {};
  return API.post("es", `/${userId}/_search`, payload);
}

function countAPI(userId, TYPE) {
  const payload = {};
  return API.post("es", `/${userId}/_count`, payload);
}

export { searchAPI, countAPI };
