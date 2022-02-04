import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyB8OAG3JP7uNBAZKS-9Ern7iEp8aeARet4",
  authDomain: "udemy-vue-firebase-sites-599e4.firebaseapp.com",
  projectId: "udemy-vue-firebase-sites-599e4",
  storageBucket: "udemy-vue-firebase-sites-599e4.appspot.com",
  messagingSenderId: "1049648309488",
  appId: "1:1049648309488:web:a589695a005d0f3d2dce35",
  measurementId: "G-BHZ0GFWW8Y"
};

// Init Firebase
firebase.initializeApp(firebaseConfig)

const projectAuth = firebase.auth()
const projectFirestore = firebase.firestore()
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectAuth, projectFirestore, timestamp }