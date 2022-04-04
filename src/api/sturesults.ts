import API from '@aws-amplify/api';

export function readDocAPI(courseId: string, sessId: number, chapId: string, matId: string) {
  return API.post("baseurl", `/user/rst/doc/${courseId}`, {
    body: {
      chapId, matId, sessId
    }
  })
}

export function saveAnswer(courseId: string, quizId: string, questionId: string, answer: any) {
  return API.post("baseurl", `/user/rst/ques/${courseId}`, {
    body: {
      quizId, questionId, answer
    }
  })
}

export function gradeQuiz(courseId: string, sessId: number, chapId: string, matId: string, started: number, answered: any) {
  return API.post("baseurl", `/user/rst/qpr/${courseId}`, {
    body: {
      chapId, matId, started, answered, sessId
    }
  })
}

export function getClassResultsAPI(courseId: string, sessId: string, lastkey = null) {
  return API.post("baseurl", `/private/rst/ls/${courseId}`, {
    body: {
      sessId,
      lastkey: lastkey ? JSON.stringify(lastkey) : null,
    }
  })
}

export function listPendingManualAPI(courseId: string, quizId: string, lastkey = null, verbose = true) {
  return API.post("baseurl", `/private/rst/all/${courseId}`, {
    body: {
      quizId, verbose,
      lastkey: lastkey ? JSON.stringify(lastkey) : null,
    }
  })
}

export function getStudentAttemptAPI(courseId: string, quizId: string, stuId: string) {
  return API.post("baseurl", `/private/rst/get/${courseId}`, {
    body: {
      quizId, stuId
    }
  })
}

export function assignQuizGradeAPI(courseId: string, chapId: string, matId: string, quizId: string, sessId: number, stuId: string, score: number, agg: number, points: number) {
  return API.post("baseurl", `/private/rst/rate/${courseId}`, {
    body: {
      chapId, matId, quizId, sessId, stuId, score, agg, points
    }
  });
}

type StuResult = {
  stuId: string;
  score: number;
}

export function bulkGradeAssignAPI(courseId: string, chapId: string, matId: string, quizId: string, agg: number, points: number, payload: Array<StuResult>) {
  return API.post("baseurl", `/private/rst/join/${courseId}`, {
    body: {
      chapId, matId, quizId, payload, agg, points
    }
  });
}

export function listQuizResAPI(courseId: string, sessId: string | number, quizId: string, lastkey = null, verbose = true) {
  return API.post("baseurl", `/private/rst/ref/${courseId}`, {
    body: {
      quizId, sessId, verbose,
      lastkey: lastkey ? JSON.stringify(lastkey) : null,
    }
  })
}
