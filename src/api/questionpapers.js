import API from '@aws-amplify/api';

// tested
function getPaperAll(id, unused = false) {
  return API.post("baseurl", `/private/qpr/all/${id}`, {
    body: {
      unused
    }
  });
}

function paperAddQ(pid, doc) {
  return API.post("baseurl", `/private/qpr/addq/${pid}`, {
    body: {
      doc
    }
  });
}

function getPublicAll(courseId, chapId, matId, fname) {
  return API.post("baseurl", `/user/qpr/ls/${courseId}`, {
    body: {
      chapId, matId, fname
    }
  });
}

function getPublicpaper(courseId, chapId, matId) {
  return API.post("baseurl", `/user/qpr/get/${courseId}`, {
    body: {
      chapId, matId
    }
  });
}
// untested

function updatePaperAPI(id, paper) {
  return API.post("baseurl", `/private/qpr/upd/${id}`, {
    body: {
      ...paper
    }
  })
}




function getPaper(id) {
  return API.get("qpapers", `/qpapers/${id}`);
}

function deletePaper(id) {
  return API.del("qpapers", `/qpapers/${id}`);
}



export {
  getPaper, getPaperAll, deletePaper, paperAddQ,
  updatePaperAPI, getPublicpaper, getPublicAll,
};
