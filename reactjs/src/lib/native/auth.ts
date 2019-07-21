import { store } from '~/native/store';

const user = store.getState().firebase.profile;

// これでは判定できない。呼び出してすぐは userはnullのようだ
const isLogin = !user.isEmpty && user.isLoaded;

export const isCurrentUser = (shortId: string) =>
  isLogin && user.shortId === shortId;
