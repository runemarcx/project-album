import * as firebase from 'firebase/app'
import { initializeApp } from 'firebase/app';
import { getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { collection, addDoc } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  // Your Firebase configuration
  // apiKey, authDomain, etc.
  apiKey: "AIzaSyCnltub1SxJ-L4kzDlqn2lDslvQR3gfARA",
  authDomain: "photo-album-a7eab.firebaseapp.com",
  projectId: "photo-album-a7eab",
  storageBucket: "photo-album-a7eab.appspot.com",
  messagingSenderId: "980313518192",
  appId: "1:980313518192:web:96a0eab413bc9804f084b5",
  measurementId: "G-PB7CND6Q3L"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize the auth object
const db = getFirestore(app); // Initialize the firestore object
const usersCollection = collection(db, 'users');
const storage = getStorage(app);

export { auth, db , usersCollection, addDoc, storage};
