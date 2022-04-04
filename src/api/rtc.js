import API from '@aws-amplify/api';
///// teacher Methods
export function startLive(courseId, topic, username) {
  return API.post("baseurl", `/private/rtc/add/${courseId}`, {
    body: {
      topic, username
    }
  })
}

export function updateLive(courseId, cAt) {
  return API.post("baseurl", `/private/rtc/upd/${courseId}`, {
    body: {
      cAt, end: true
    }
  });
}

export function listLives(courseId, lastkey = null) {
  return API.post("baseurl", `/private/rtc/ls/${courseId}`, {
    body: {
      lastkey: lastkey ? JSON.stringify(lastkey) : null,
    }
  });
}

export function teacherAcceptApply(courseId, cAt, stuId, username) {
  return API.post("baseurl", `/private/rtc/acc/${courseId}`, {
    body: {
      cAt, username, stuId
    }
  })
}

export function teacherRejectApply(courseId, cAt, stuId) {
  return API.post("baseurl", `/private/rtc/rej/${courseId}`, {
    body: {
      cAt, stuId
    }
  })
}

export function teacherStartScreenShare(courseId, cAt) {
  return API.post("baseurl", `/private/rtc/start/${courseId}`, {
    body: {
      cAt
    }
  })
}

export function teacherStopScreenShare(courseId, cAt) {
  return API.post("baseurl", `/private/rtc/stop/${courseId}`, {
    body: {
      cAt
    }
  })
}

// send { userId, chat, aud, vid } to update user object
export function updateRoomUser(courseId, cAt, user) {
  return API.post("baseurl", `/private/rtc/ups/${courseId}`, {
    body: {
      cAt, user
    }
  })
}

export function endLive(courseId, cAt) {
  return API.post("baseurl", `/private/rtc/end/${courseId}`, {
    body: {
      cAt
    }
  })
}
//// student methods

// returns {course, me, users, appId, onlineUsers}
// https://github.com/AgoraIO-Usecase/eEducation/blob/76e1e82b2f14759a424550c11442f1513d6ab04c/education_web/src/stores/room.ts#L658
export function enterLive(courseId, sessId, cAt, username) {
  // console.warn('Edit this function');
  return API.post("baseurl", `/user/rtc/join/${courseId}`, {
    body: {
      username, cAt, sessId
    }
  });
}

// returns { room, user, users }
export function getRoomInfo(courseId, cAt) {
  return API.post("baseurl", `/user/rtc/get/${courseId}`, {
    body: {
      cAt
    }
  })
}


// returns { token } in format
export function refreshToken(courseId, cAt) {
  return API.post("baseurl", `/user/rtc/ref/${courseId}`, {
    body: {
      cAt
    }
  })
}


export function studentSendApply(courseId, cAt, username) {
  return API.post("baseurl", `/user/rtc/start/${courseId}`, {
    body: {
      cAt, username
    }
  })
}

export function studentStopCoVideo(courseId, cAt, username) {
  return API.post("baseurl", `/user/rtc/stop/${courseId}`, {
    body: {
      cAt, username
    }
  })
}
