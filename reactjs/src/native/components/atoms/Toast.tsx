import { Toast } from 'native-base';

const TOAST_DURATION = 3000;

export const successToast = (
  path: string,
  redirectHandler: any,
  message: string
) =>
  Toast.show({
    text: message,
    duration: TOAST_DURATION,
    type: 'success',
    onClose: () => redirectHandler(path)
  });

export const errorToast = (errorMessage: string) =>
  Toast.show({
    text: `エラーが発生ました。(${errorMessage})`,
    type: 'danger',
    duration: TOAST_DURATION
  });
