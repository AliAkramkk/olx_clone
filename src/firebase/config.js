import firebase from 'firebase';
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBzgFiiqkjTHchc-Lyx5fg2oB9T16USaOM",
  authDomain: "olxreact-aad0c.firebaseapp.com",
  projectId: "olxreact-aad0c",
  storageBucket: "olxreact-aad0c.appspot.com",
  messagingSenderId: "1044554073797",
  appId: "1:1044554073797:web:87ebe124b35f94df0352ac",
  measurementId: "G-D6979NBPFQ"
};

export default firebase.initializeApp(firebaseConfig);