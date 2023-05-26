import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCnltub1SxJ-L4kzDlqn2lDslvQR3gfARA",
    authDomain: "photo-album-a7eab.firebaseapp.com",
    projectId: "photo-album-a7eab",
    storageBucket: "photo-album-a7eab.appspot.com",
    messagingSenderId: "980313518192",
    appId: "1:980313518192:web:96a0eab413bc9804f084b5",
    measurementId: "G-PB7CND6Q3L"
  };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const db = firebase.firestore();
