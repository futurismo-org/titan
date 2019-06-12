/*
   @https://github.com/jakemadness/discord-client-api/tree/master/javascript
*/

const apiToken = process.env.REACT_APP_DISCORD_TOKEN;
const apiBase = 'https://discordapp.com/api/v6/';

/*
      REUSABLE FUNCTIONS.
   */
const httpRequest = function(
  method: string,
  url: string,
  headers: any,
  post: any,
  callback: any
) {
  var request = new XMLHttpRequest(); // eslint-disable-line no-undef
  request.onreadystatechange = function(this: XMLHttpRequest) {
    this.readyState === 4 && callback(this.responseText);
  };
  request.open(method, url, true);
  for (var i = 0; i < headers.length; i += 2) {
    request.setRequestHeader(headers[i], headers[i + 1]);
  }
  request.send(post);
};

const apiRequest = function(
  method: string,
  path: string,
  post: any,
  callback: any
) {
  httpRequest(
    method,
    apiBase + path,
    [
      'x-requested-with',
      'XMLHttpRequest',
      'authorization',
      apiToken,
      'content-type',
      post ? 'application/json' : 'application/x-www-form-urlencoded'
    ],
    post,
    callback
  );
};

/*
      MAIN FUNCTIONS.
   */
export const joinServer = function(inviteCode: string, callback: any) {
  apiRequest('POST', 'invite/' + inviteCode, null, callback);
};

export const leaveServer = function(serverId: string, callback: any) {
  apiRequest('DELETE', 'users/@me/guilds/' + serverId, null, callback);
};

export const getServers = function(callback: any) {
  apiRequest('GET', 'users/@me/guilds', null, callback);
};

export const sendMessage = function(
  channelId: string,
  message: string,
  callback: any
) {
  apiRequest(
    'POST',
    'channels/' + channelId + '/messages',
    JSON.stringify({ content: message, nonce: Date.now(), tts: false }),
    callback
  );
};

export const deleteMessage = function(
  channelId: string,
  messageId: string,
  callback: any
) {
  apiRequest(
    'DELETE',
    'channels/' + channelId + '/messages/' + messageId,
    null,
    callback
  );
};

export const getMessages = function(
  channelId: string,
  amount: number,
  callback: any
) {
  apiRequest(
    'GET',
    'channels/' + channelId + '/messages?limit=' + amount.toString(),
    null,
    callback
  );
};

export const addReaction = function(
  channelId: string,
  messageId: string,
  reaction: any,
  callback: any
) {
  apiRequest(
    'PUT',
    'channels/' +
      channelId +
      '/messages/' +
      messageId +
      '/reactions/' +
      reaction +
      '/@me',
    null,
    callback
  );
};

export const removeReaction = function(
  channelId: string,
  messageId: string,
  reaction: any,
  callback: any
) {
  apiRequest(
    'DELETE',
    'channels/' +
      channelId +
      '/messages/' +
      messageId +
      '/reactions/' +
      reaction +
      '/@me',
    null,
    callback
  );
};

export const isTyping = function(channelId: string, callback: any) {
  apiRequest('POST', 'channels/' + channelId + '/typing', null, callback);
};

export const changeNickname = function(
  serverId: string,
  nickname: string,
  callback: any
) {
  apiRequest(
    'PATCH',
    'guilds/' + serverId + '/members/@me/nick',
    JSON.stringify({ nick: nickname }),
    callback
  );
};

export const updateStatus = function(status: string, callback: any) {
  apiRequest(
    'PATCH',
    'users/@me/settings',
    JSON.stringify({ status: status }),
    callback
  );
};

export const updateUserSettings = function(
  username: string,
  email: string,
  password: string,
  newPassword: string,
  avatarBase64: any,
  callback: any
) {
  apiRequest(
    'PATCH',
    'users/@me',
    JSON.stringify({
      username: username,
      email: email,
      password: password,
      new_password: newPassword,  // eslint-disable-line
      avatar: avatarBase64,
      discriminator: null
    }),
    callback
  );
};

export const createServer = function(
  name: string,
  region: string,
  icon: any,
  callback: any
) {
  apiRequest(
    'POST',
    'guilds',
    JSON.stringify({ name: name, region: region, icon: icon }),
    callback
  );
};

export const deleteServer = function(serverId: string, callback: any) {
  apiRequest(
    'POST',
    'guilds/' + serverId + '/delete',
    JSON.stringify({}),
    callback
  );
};

export const createChannel = function(
  serverId: string,
  name: string,
  parentId: string,
  type: any,
  callback: any
) {
  apiRequest(
    'POST',
    'guilds/' + serverId + '/channels',
    JSON.stringify({
      name: name,
      parent_id: parentId,  // eslint-disable-line
      type: type,
      permission_overwrites: [] // eslint-disable-line
    }),
    callback
  );
};

export const deleteChannel = function(channelId: string, callback: any) {
  apiRequest('DELETE', 'channels/' + channelId, null, callback);
};

export const createRole = function(serverId: string, callback: any) {
  apiRequest('POST', 'guilds/' + serverId + '/roles', null, callback);
};

export const deleteRole = function(
  serverId: string,
  roleId: string,
  callback: any
) {
  apiRequest(
    'DELETE',
    'guilds/' + serverId + '/roles/' + roleId,
    null,
    callback
  );
};

export const joinHypesquad = function(houseNumber: any, callback: any) {
  apiRequest(
    'POST',
    'hypesquad/online',
    JSON.stringify({ house_id: houseNumber }), // eslint-disable-line
    callback
  );
};

export const createInvite = function(channelId: string, callback: any) {
  apiRequest(
    'POST',
    'channels/' + channelId + '/invites',
    JSON.stringify({ max_age: 0, max_uses: 0, temporary: false }), // eslint-disable-line
    callback
  );
};
