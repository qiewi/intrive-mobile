import { firestore } from '../firebaseConfig'; // Import initialized Firestore instance
import { collection, getDocs } from 'firebase/firestore';

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
