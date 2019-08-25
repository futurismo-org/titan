import Reactotron from 'reactotron-react-native';
// import { reactotronRedux } from 'reactotron-redux';

export default Reactotron.configure({ name: 'Native' })
  .useReactNative({})
  // .use(reactotronRedux()); out of memoryで落ちる。
  .connect();
