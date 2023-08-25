import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCoidjCfrlnUAOFZNxOIzm88JWP67VIW2s",
  authDomain: "react-firebase-3c3d2.firebaseapp.com",
  projectId: "react-firebase-3c3d2",
  storageBucket: "react-firebase-3c3d2.appspot.com",
  messagingSenderId: "211127702354",
  appId: "1:211127702354:web:f84da47d1a1bd9e6e2e08b"
};
 export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
// export {app , auth};

