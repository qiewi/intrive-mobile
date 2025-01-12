import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { fetchAvailableModules } from './modules'; // Import fetchAvailableModules

const db = getFirestore();

// Define the structure for a single module
interface ModuleData {
  status: string;
  points: number;
  elapsedTime: number;
  quizCompleted: boolean;
  quizScore: number;
  watchedVideos: string[];
}

// Define the structure for the user's modules
interface UserModules {
  integralModule: Record<number, ModuleData>;
  derivativeModule: Record<number, ModuleData>;
}

export async function syncUserHistory(userId: string) {
  try {
    const userDocRef = doc(db, 'users', userId);
    const userDocSnap = await getDoc(userDocRef);

    // Fetch module counts dynamically
    const moduleCounts = await fetchAvailableModules();

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();

      // Initialize userModules structure
      const userModules: UserModules = userData.modules || {
        integralModule: {},
        derivativeModule: {},
      };

      // Loop through integral modules
      for (let i = 1; i <= moduleCounts.integralModules; i++) {
        if (!userModules.integralModule[i]) {
          userModules.integralModule[i] = {
            status: 'Incomplete',
            points: 0,
            elapsedTime: 0,
            quizCompleted: false,
            quizScore: 0,
            watchedVideos: [],
          };
        }
      }

      // Loop through derivative modules
      for (let i = 1; i <= moduleCounts.derivativeModules; i++) {
        if (!userModules.derivativeModule[i]) {
          userModules.derivativeModule[i] = {
            status: 'Incomplete',
            points: 0,
            elapsedTime: 0,
            quizCompleted: false,
            quizScore: 0,
            watchedVideos: [],
          };
        }
      }

      // Update user's modules in Firestore
      await setDoc(userDocRef, { ...userData, modules: userModules }, { merge: true });
    } else {
      console.warn('User document does not exist. Creating new user data.');

      // Initialize new user modules structure
      const newUserModules: UserModules = {
        integralModule: {},
        derivativeModule: {},
      };

      // Loop through integral modules
      for (let i = 1; i <= moduleCounts.integralModules; i++) {
        newUserModules.integralModule[i] = {
          status: 'Incomplete',
          points: 0,
          elapsedTime: 0,
          quizCompleted: false,
          quizScore: 0,
          watchedVideos: [],
        };
      }

      // Loop through derivative modules
      for (let i = 1; i <= moduleCounts.derivativeModules; i++) {
        newUserModules.derivativeModule[i] = {
          status: 'Incomplete',
          points: 0,
          elapsedTime: 0,
          quizCompleted: false,
          quizScore: 0,
          watchedVideos: [],
        };
      }

      // Create user document with initialized data
      await setDoc(userDocRef, {
        modules: newUserModules,
      });
    }
  } catch (error) {
    console.error('Error syncing user history:', error);
    throw new Error('Could not sync user history.');
  }
}
