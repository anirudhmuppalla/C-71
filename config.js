import * as firebase from 'firebase'
import { config } from 'yargs';
require('firebase/firestore')
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyALzWwNCfW9PaeJJNSrfn5lDkZOmdFu88U",
    authDomain: "wily-app-ba365.firebaseapp.com",
    projectId: "wily-app-ba365",
    storageBucket: "wily-app-ba365.appspot.com",
    messagingSenderId: "844542643231",
    appId: "1:844542643231:web:8684b97c52410d961ed92a"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore()