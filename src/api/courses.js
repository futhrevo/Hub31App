import API, { graphqlOperation } from '@aws-amplify/api';

// tested
function createCourse(data) {
  return API.post("baseurl", "/private/cse/add/new", {
    body: {
      ...data
    }
  })
}


function listCourses(lastkey = null) {
  return API.post("baseurl", `/private/cse/ls/all`, {
    body: {
      queryStringParameters: {  // OPTIONAL
        lastkey: lastkey ? JSON.stringify(lastkey) : null,
      }
    }
  })
}

function adminCourseDetails(id) {
  return API.post("baseurl", `/private/cse/get/${id}`);
}

function aboutCourse(id, data) {
  return API.post("baseurl", `/private/cse/abt/${id}`, {
    body: {
      ...data
    }
  })
}

function courseResources(id, data) {
  return API.post("baseurl", `/private/cse/rsc/${id}`, {
    body: {
      ...data
    }
  })
}

function courseDescription(id, data) {
  return API.post("baseurl", `/private/cse/desc/${id}`, {
    body: {
      ...data
    }
  })
}

function updateCourse(id, data) {
  return API.post("baseurl", `/private/cse/upd/${id}`, {
    body: {
      ...data
    }
  })
}

function resolveCourse(id) {
  return API.post("baseurl", `/user/cse/get/${id}`);
}

function joinCourse(id) {
  return API.post("baseurl", `/user/cse/join/${id}`);
}

function rateCourseAPI(courseId, sessId, rating) {
  return API.post("baseurl", `/user/cse/rate/${courseId}`, {
    body: {
      rating, sessId
    }
  })
}

function viewCourseDetails(id) {
  return API.post("baseurl", `/user/cse/get/${id}`);
}

// untested

function classCourseDetails(id, chapterId) {
  return API.post("baseurl", `/user/cse/cls/${id}`, {
    body: {
      chapterId
    }
  });
}

function deleteCourse(id) {
  return API.post("baseurl", `/private/cse/del/${id}`);
}

function listSpecCourse(id, lastkey = null) {
  let opts = {
    queryStringParameters: {  // OPTIONAL
      lastkey: lastkey ? JSON.stringify(lastkey) : null,
    }
  }
  return API.get("courses", `/courses/spec/${id}`, opts);
}

// graphql
const qldiscoverCourses = `query discover($nextToken: String){
  discover(nextToken: $nextToken) {
    nextToken
    courses {
      id
      title
      rating
      price
    }
    joined
  }
}`;

function discoverCourses(nextToken) {
  // return API.post("baseurl", `/user/cse/disc/3`);
  return API.graphql(graphqlOperation(qldiscoverCourses, { nextToken }));
}

const qlJoinedCourses = `query joined {
  getJoined {
    id
    title
    totalC
  }
}`;
function joinedCourses() {
  // return API.post("baseurl", `/user/cse/joined/all`);
  return API.graphql(graphqlOperation(qlJoinedCourses));
}

const qlListPublicCourses = `query publicCatalog($count: Int, $nextToken: String) {
  listPublicCourses(count: $count, nextToken: $nextToken) {
    nextToken
    courses {
      id
      title
      rating
      price
    }
  }
}`;
function listAllCourses(nextToken = null, count = 10) {
  // return API.post("baseurl", '/user/cse/ls/all', {
  //   body: {
  //     queryStringParameters: {  // OPTIONAL
  //       lastkey: lastkey ? JSON.stringify(lastkey) : null,
  //     }
  //   }
  // });
  return API.graphql(graphqlOperation(qlListPublicCourses, { nextToken, count }));
}

export {
  createCourse, updateCourse, aboutCourse, courseResources, listCourses, deleteCourse,
  listSpecCourse, discoverCourses, joinCourse, joinedCourses, resolveCourse, viewCourseDetails, adminCourseDetails,
  classCourseDetails, listAllCourses, rateCourseAPI, courseDescription
};
