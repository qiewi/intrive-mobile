import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { derivativeModules } from '../data/derivativeModules';
import { integralModules } from '../data/integralModules';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: 'AIzaSyCwem_IhKeqcXrPNYA1oAzmVN9Y8B_UMJ4',
    authDomain: 'intrive-mobile.firebaseapp.com',
    projectId: 'intrive-mobile',
    storageBucket: 'intrive-mobile.appspot.com',
    messagingSenderId: '1092306470036',
    appId: '1:1092306470036:android:eb9ba00058362698de6081',
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * Uploads a list of modules to Firestore under a root-level collection.
 * @param {string} collectionName - The name of the collection ('integralModules' or 'derivativeModules').
 * @param {Array} modules - The list of modules to upload.
 */
const uploadModules = async (collectionName: string, modules: any[]) => {
  try {
    const collectionRef = collection(db, collectionName);
    for (const module of modules) {
      const docRef = doc(collectionRef, module.id); // Use module ID as document ID
      await setDoc(docRef, module);
      console.log(`Uploaded module: ${module.title} to ${collectionName}`);
    }
    console.log(`Successfully uploaded all modules to ${collectionName}!`);
  } catch (error) {
    console.error(`Error uploading modules to ${collectionName}:`, error);
  }
};

// Run the upload for both module types
(async () => {
  await uploadModules('integralModules', integralModules);
  await uploadModules('derivativeModules', derivativeModules);
})();
