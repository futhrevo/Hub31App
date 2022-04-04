import API from '@aws-amplify/api';

export function addForum(courseId: string) {
  return API.post("baseurl", `/private/for/add/${courseId}`, null)
}

export function listForums(courseId: string) {
  return API.post("baseurl", `/user/for/ls/${courseId}`, null);
}
