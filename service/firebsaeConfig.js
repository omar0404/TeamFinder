import { initializeApp } from 'firebase/app';

import { FIREBASE } from "../constants/firebase";

// Initialize Firebase
var config = {
  apiKey: FIREBASE.API_KEY,
  authDomain: FIREBASE.AUTH_DOMAIN,
  databaseURL: FIREBASE.DATABASE_URL,
  projectId: FIREBASE.PROJECT_ID,
  storageBucket: "gs://matchfinder-e5901.appspot.com"
};


const x = initializeApp(config)
export default x;
