import API from '@aws-amplify/api';

export function upsertmatAPI(courseId, chapterId, doc, matId = null) {
  return API.post("baseurl", `/private/mat/ups/${courseId}`, {
    body: {
      chapterId, doc, matId
    }
  })
}

export function deleteMatAPI(courseId, chapterId, matId, matIndex) {
  return API.post("baseurl", `/private/mat/del/${courseId}`, {
    body: {
      chapterId, matId, matIndex
    }
  });
}

export function swapMatAPI(courseId, chapterId, matId1, index1, matId2, index2) {
  return API.post("baseurl", `/private/mat/swap/${courseId}`, {
    body: {
      chapterId, matId1, index1, matId2, index2
    }
  });
}

export function adViewMatAPI(courseId, chapterId,) {
  return API.post("baseurl", `/private/mat/get/${courseId}`, {
    body: {
      chapterId
    }
  });
}

export function getPreUrl(docId, doctype, filename, filetype, filesize) {
  return API.post("baseurl", '/private/mat/gUrl/new', {
    body: {
      docId, doctype, filename, filetype, filesize
    }
  })
}

export function delPreUrl(docId, dtype, key, index) {
  return API.post("baseurl", '/private/mat/dUrl/new', {
    body: {
      docId, key, index
    }
  });
}

export function viewMatAPI(id) {
  return API.get("baseurl", `/private/mat/${id}`);
}
