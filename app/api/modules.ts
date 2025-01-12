import { firestore } from '../firebaseConfig'; // Import initialized Firestore instance
import { collection, getDocs } from 'firebase/firestore';

/**
 * Fetch all modules from the `modules` collection.
 */
export async function fetchModules() {
  const modules: any[] = [];
  try {
    const querySnapshot = await getDocs(collection(firestore, 'modules')); // Use `firestore` from `firebaseConfig.js`
    querySnapshot.forEach((doc) => {
      modules.push({ id: doc.id, ...doc.data() });
    });
  } catch (error) {
    console.error('Error fetching modules:', error);
    throw new Error('Could not fetch modules.');
  }
  return modules;
}

/**
 * Fetch available modules from `integralModules` and `derivativeModules` collections.
 * Returns the count of modules in each collection.
 */
export async function fetchAvailableModules() {
  const moduleCounts = {
    integralModules: 0,
    derivativeModules: 0,
  };

  try {
    // Fetch all documents from `integralModules`
    const integralSnapshot = await getDocs(collection(firestore, 'integralModules'));
    moduleCounts.integralModules = integralSnapshot.size; // Count the documents

    // Fetch all documents from `derivativeModules`
    const derivativeSnapshot = await getDocs(collection(firestore, 'derivativeModules'));
    moduleCounts.derivativeModules = derivativeSnapshot.size; // Count the documents

    return moduleCounts;
  } catch (error) {
    console.error('Error fetching available modules:', error);
    throw new Error('Could not fetch module counts.');
  }
}
