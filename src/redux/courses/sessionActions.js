export const BEGIN_SESSION = 'BEG_SESS';
export const UPDATE_SESSION = "UPD_SESS";
export const END_SESSION = 'END_SESS';

export function addSession(courseId, data) {
  return { type: BEGIN_SESSION, courseId, data };
}

export function updateSession(courseId, createdAt, eAt, title) {
  return { type: UPDATE_SESSION, courseId, createdAt, eAt, title }
}
export function endSession(courseId, createdAt) {
  return { type: END_SESSION, courseId, createdAt };
}


/*
 * Action reducer Helpers
 */

export function addSessionHelper(sessions, data) {
  return [data, ...sessions]
}

export function updateSessionHelper(sessions, createdAt, eAt, title) {
  return sessions.map((session) => {
    if (session.cAt !== createdAt) {
      return session;
    }
    return {
      ...session,
      title,
      eAt
    }
  })
}

export function endSessionHelper(sessions, createdAt) {
  return sessions.map((session) => {
    if (session.cAt !== createdAt) {
      return session;
    }
    return {
      ...session,
      eAt: Date.now(),
    }
  })
}
