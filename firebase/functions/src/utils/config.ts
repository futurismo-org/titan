import admin from 'firebase-admin';

export const configDev = {
  apiKey: 'AIzaSyBAOF5ih35uKsTVIijD_JCpQAqIxNqiHPk',
  authDomain: 'titan-dev-1234.firebaseapp.com',
  databaseURL: 'https://titan-dev-1234.firebaseio.com',
  projectId: 'titan-dev-1234',
  storageBucket: 'titan-dev-1234.appspot.com',
  messagingSenderId: '942583859110',
  appId: '1:942583859110:web:70f4583610955abd',
  credential: admin.credential.applicationDefault()
};

export const configProd = {
  apiKey: 'AIzaSyBSpdDrqpu0SvZ22Td57Q_RwqlslfKIJWo',
  authDomain: 'titan-241022.firebaseapp.com',
  databaseURL: 'https://titan-241022.firebaseio.com',
  projectId: 'titan-241022',
  storageBucket: 'titan-241022.appspot.com',
  messagingSenderId: '654274743440',
  appId: '1:654274743440:web:211ec9466f86a631',
  credential: admin.credential.applicationDefault()
};

export const configDemo = {
  apiKey: 'AIzaSyDM4JkfBcRf7UE999mVQRWfLG2i_vO_KZw',
  authDomain: 'titan-demonstration.firebaseapp.com',
  databaseURL: 'https://titan-demonstration.firebaseio.com',
  projectId: 'titan-demonstration',
  storageBucket: '',
  messagingSenderId: '312299063844',
  appId: '1:312299063844:web:fee45c689c5df437',
  credential: admin.credential.applicationDefault()
};
