import { store } from '~/native/store';

const user = store.getState().firebase.profile;

export const isLogin = !user.isEmpty && user.isLoaded;
export const isCurrentUser = (shortId: string) =>
  isLogin && user.shortId === shortId;
