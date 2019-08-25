import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

const reactotron = Reactotron.configure({ name: 'Native' })
  .useReactNative({})
  .use(reactotronRedux())
  .connect();

export default reactotron;
