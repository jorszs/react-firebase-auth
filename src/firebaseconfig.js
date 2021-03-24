import firebase from "firebase";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAur3NCaTxeYMWF_EN4iXe5v33aQUa_4rY",
  authDomain: "react-firebase-jorx.firebaseapp.com",
  projectId: "react-firebase-jorx",
  storageBucket: "react-firebase-jorx.appspot.com",
  messagingSenderId: "769037890304",
  appId: "1:769037890304:web:b461944e98f556ca5ff9e5",
  measurementId: "G-YBYBWPYT20",
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
const auth = fire.auth();
const fstore = fire.firestore();

export { auth };
export { fstore };
