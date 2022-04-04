import API from '@aws-amplify/api';

// tested
function getPublicdoc(id, method) {
  if (id != null)
    return API.post("baseurl", `/user/cse/${method}/${id}`);
}

function getDocument(id) {
  if (id != null)
    return API.post("baseurl", `/private/doc/get/${id}`);
}

function updateDocument(id, { title, body }) {
  return API.post("baseurl", `/private/doc/upd/${id}`, {
    body: {
      title, body
    }
  })
}

function getStudentDoc(courseId, sessId, chapId, matId) {
  return API.post("baseurl", `/user/doc/get/${courseId}`, {
    body: {
      chapId, matId, sessId
    }
  });
}

//untested
function updatePublic(id, pub) {
  return API.post("baseurl", `/private/doc/pub/${id}`, {
    body: {
      pub
    }
  })
}

export { getDocument, updateDocument, getPublicdoc, getStudentDoc, updatePublic };
