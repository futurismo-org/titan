import axios, { AxiosRequestConfig } from 'axios';

const apiToken = process.env.REACT_APP_DISCORD_TOKEN;
const apiBase = 'https://discordapp.com/api/v6/';

const generalChannelId = '587935450463993870';

const AuthorizationMessage = `Bot ${apiToken}`;
const requestHeaders: AxiosRequestConfig = {
  headers: {
    Authorization: AuthorizationMessage
  }
};

export const getMessages = (
  channelId: string = generalChannelId,
  limit: number = 10
) => {
  const url = `${apiBase}channels/${channelId}/messages?limit=${limit.toString()}`;
  return axios.get(url, requestHeaders).then(res => res.data);
};

export const postMessage = (webhookURL: string, message: string) => {
  const data = {
    content: message,
    tts: false,
    noice: new Date()
  };

  axios.post(webhookURL, data);
};
