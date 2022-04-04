import API from '@aws-amplify/api';

function startSession(courseId, data) {
  return API.post("baseurl", `/private/sess/add/${courseId}`, {
    body: {
      ...data
    }
  })
}

function updateSession(courseId, id, eAt, title) {
  return API.post("baseurl", `/private/sess/upd/${courseId}`, {
    body: {
      id, eAt, title
    }
  })
}

function listSessionUsers(courseId, id) {
  return API.post("baseurl", `/private/sess/ls/${courseId}`, {
    body: {
      id
    }
  })
}

function endSession(courseId, id) {
  return API.post("baseurl", `/private/sess/end/${courseId}`, {
    body: {
      id
    }
  });
}

export { startSession, endSession, updateSession, listSessionUsers };
