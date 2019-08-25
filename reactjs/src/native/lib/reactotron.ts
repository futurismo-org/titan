import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

const reactotron = Reactotron.configure({
  name: 'Native',
  host: '192.168.1.30',
  port: 9090
})
  .useReactNative({})
  .use(reactotronRedux())
  .connect() as any;

export default reactotron;
