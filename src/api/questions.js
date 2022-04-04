import API from '@aws-amplify/api';
// tested
function getQuestion(id) {
  return API.post("baseurl", `/private/ques/get/${id}`);
}

// untested


function updateQuestion(id, ques) {
  return API.post("baseurl", `/private/ques/upd/${id}`, {
    body: {
      ...ques
    }
  })
}

function deleteQuestion(id) {
  return API.del("questions", `/questions/${id}`);
}


export { getQuestion, deleteQuestion, updateQuestion };
