import API from '@aws-amplify/api';

function attachConnect(id) {
  return API.post("baseurl", `/user/policy/connect/p`);
}

function attachChannel(channel) {
  return API.post("baseurl", `/user/policy/ups/${channel}`);
}

export { attachConnect, attachChannel };
