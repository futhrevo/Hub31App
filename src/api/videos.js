import API from '@aws-amplify/api';

// tested
function updateVid(id, data) {
  return API.post("baseurl", `/private/vid/upd/${id}`, {
    body: {
      ...data
    }
  })
}

function getVid(id) {
  return API.post("baseurl", `/private/vid/get/${id}`);
}
// untested
// function cookVid(courseId, chapId, matId, sp = false) {
//   return API.post("baseurl", `/cook/${courseId}`, {
//     body: {
//       chapId, matId, sp
//     }
//   });
// }

function authVid(courseId, chapId, matId) {
  return API.post("baseurl", `/user/vid/auth/${courseId}`, {
    body: {
      chapId, matId
    }
  });
}



function deleteVid(id) {
  return API.del("videos", `/videos/${id}`);
}

// function sentry() {
//   return API.get("videos", '/videos/sentry.key');
// }
export { updateVid, getVid, deleteVid, authVid };
