import API from '@aws-amplify/api';

export function addPost(forum: string, data) {
  return API.post("baseurl", `/user/pst/add/${forum}`, {
    body: {
      ...data
    }
  })
}

export function updatePost(forum: string, data) {
  return API.post("baseurl", `/user/pst/upd/${forum}`, {
    body: {
      ...data
    }
  })
}

export function favPost(forum: string, slug: string, fav: boolean) {
  return API.post("baseurl", `/user/pst/rate/${forum}`, {
    body: {
      fav, slug
    }
  })
}

export function deletePost(forum: string, slug: string) {
  return API.post("baseurl", `/user/pst/del/${forum}`, {
    body: {
      slug
    }
  });
}

export function getPost(forum: string, slug: string) {
  return API.post("baseurl", `/user/pst/get/${forum}`, {
    body: {
      slug
    }
  });
}

export function getStars(forum: string, slug: string) {
  return API.post("baseurl", `/user/pst/star/${forum}`, {
    body: {
      slug
    }
  });
}

export function listPosts(forum: string, lastkey = null, time = true, dir = true) {
  return API.post("baseurl", `/user/pst/ls/${forum}`, {
    body: {
      forum, time, dir, lastkey: lastkey ? JSON.stringify(lastkey) : null,
    }
  });
}

export function listPinned(forum: string, lastkey = null) {
  return API.post("baseurl", `/user/pst/pin/${forum}`, {
    body: {
      forum, lastkey: lastkey ? JSON.stringify(lastkey) : null,
    }
  });
}
