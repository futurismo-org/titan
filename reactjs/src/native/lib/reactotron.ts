import Reactotron from 'reactotron-react-native';

Reactotron.configure({
  name: 'mobile'
})
  .useReactNative({})
  .connect();

export default Reactotron;
