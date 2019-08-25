import Reactotron from 'reactotron-react-native';

const isLogEnable = true;
const reactotron = Reactotron.configure({ name: 'Native' }).useReactNative({});

function log(message: string, ...args: any[]) {
  if (!isLogEnable) return;
  Reactotron.display({
    name: 'LOG',
    preview: message,
    value: { message, args }
  });
}

export function info(message: string, ...args: any[]) {
  if (!isLogEnable) return;
  Reactotron.display({
    name: 'INFO',
    preview: message,
    value: { message, args }
  });
}

export function warn(message: string, ...args: any[]) {
  if (!isLogEnable) return;
  Reactotron.display({
    name: 'WARN',
    preview: message,
    value: { message, args },
    important: true
  });
}

export function error(message: string, ...args: any[]) {
  if (!isLogEnable) return;
  Reactotron.display({
    name: 'ERROR',
    preview: message,
    value: { message, args },
    important: true
  });
}

function connectConsoleToReactotron() {
  console.info = info;
  console.log = log;
  console.warn = warn;
  console.error = error;
}

export const initializeReactotron = () => {
  reactotron.connect();
  connectConsoleToReactotron();
};
