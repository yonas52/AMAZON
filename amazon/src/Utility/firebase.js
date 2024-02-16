
import firebase from "firebase/compat/app";

import{getAuth} from 'firebase/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCU_mYN85g5Z1Cq4ncBUiuGUrUvWzXeRmE",
  authDomain: "clone-3245d.firebaseapp.com",
  projectId: "clone-3245d",
  storageBucket: "clone-3245d.appspot.com",
  messagingSenderId: "348256133384",
  appId: "1:348256133384:web:20af7234ae286250414cbd"
};

// Initialize Firebase
export const app =firebase. initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db=app.firestore();


