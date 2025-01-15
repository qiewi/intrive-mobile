import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { integralQuizzes } from '../data/integralQuizzes'; // Adjust the path as needed
import { derivativeQuizzes } from '../data/derivativeQuizzes'; // Adjust the path as needed
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
 * Uploads a list of quizzes to Firestore under a root-level collection.
 * @param {string} collectionName - The name of the collection ('integralQuizzes' or 'derivativeQuizzes').
 * @param {Array} quizzes - The list of quizzes to upload.
 */
const uploadQuizzes = async (collectionName: string, quizzes: any[]) => {
  try {
    const collectionRef = collection(db, collectionName);
    for (const quiz of quizzes) {
      const docRef = doc(collectionRef, quiz.id); // Use quiz ID as document ID
      await setDoc(docRef, quiz);
      console.log(`Uploaded quiz with ID: ${quiz.id} to ${collectionName}`);
    }
    console.log(`Successfully uploaded all quizzes to ${collectionName}!`);
  } catch (error) {
    console.error(`Error uploading quizzes to ${collectionName}:`, error);
  }
};

// Run the upload for both quiz types
(async () => {
  await uploadQuizzes('integralQuizzes', integralQuizzes);
  await uploadQuizzes('derivativeQuizzes', derivativeQuizzes);
})();
