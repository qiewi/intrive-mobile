import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const db = getFirestore();

export async function syncUserHistory(userId: string, modules: any[]) {
  try {
    const userDocRef = doc(db, 'users', userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();

      // Initialize module progress if not already set
      const userModules = userData.modules || {};
      modules.forEach((module) => {
        if (!userModules[module.id]) {
          userModules[module.id] = {
            progress: 0, // Default progress
            points: 0,   // Default points
            elapsedTime: 0, // Default elapsed time
            completedQuizzes: [], // Default quizzes
          };
        }
      });

      // Update user's modules in Firestore
      await setDoc(userDocRef, { ...userData, modules: userModules }, { merge: true });
    } else {
      console.warn('User document does not exist. Cannot sync history.');
    }
  } catch (error) {
    console.error('Error syncing user history:', error);
    throw new Error('Could not sync user history.');
  }
}
