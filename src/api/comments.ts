import API from '@aws-amplify/api';

export function addComment(post: string, slug: string, data) {
  return API.post("baseurl", `/user/com/add/${post}`, {
    body: {
      ...data,
      slug
    }
  })
}

export function updateComment(post: string, data) {
  return API.post("baseurl", `/user/com/upd/${post}`, {
    body: {
      ...data
    }
  })
}

export function listComments(post: string, lastkey: any, dir) {
  return API.post("baseurl", `/user/com/ls/${post}`, {
    body: {
      lastkey: lastkey ? JSON.stringify(lastkey) : null,
    }
  });
}

export function delComments(post: string, slug: string, createdAt: number) {
  return API.post("baseurl", `/user/com/del/${post}`, {
    body: {
      slug,
      createdAt
    }
  });
}
