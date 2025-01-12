import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCwem_IhKeqcXrPNYA1oAzmVN9Y8B_UMJ4',
  authDomain: 'intrive-mobile.firebaseapp.com',
  projectId: 'intrive-mobile',
  storageBucket: 'intrive-mobile.appspot.com',
  messagingSenderId: '1092306470036',
  appId: '1:1092306470036:android:eb9ba00058362698de6081',
};

// Check if any Firebase app instances are already initialized
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };