import Reactotron from 'reactotron-react-js';
// import { reactotronRedux } from 'reactotron-redux';

export default Reactotron.configure({ name: 'Web' })
  // .use(reactotronRedux()) out of memoryとなる。
  .connect() as any;
