import API from '@aws-amplify/api';

// tested
// untested
export function addChapterAPI(courseId, data) {
  return API.post("baseurl", `/private/chap/add/${courseId}`, {
    body: {
      ...data
    }
  })
}

export function updateChapterAPI(courseId, chapId, data) {
  return API.post("baseurl", `/private/chap/upd/${courseId}`, {
    body: {
      chapId, chapItem: data
    }
  })
}

export function deleteChapterAPI(courseId, chapId, chapIndex) {
  return API.post("baseurl", `/private/chap/del/${courseId}`, {
    body: {
      chapId, chapIndex
    }
  });
}

export function swapChapterAPI(courseId, chapId1, index1, chapId2, index2) {
  return API.post("baseurl", `/private/chap/swap/${courseId}`, {
    body: {
      chapId1, index1, chapId2, index2
    }
  });
}


