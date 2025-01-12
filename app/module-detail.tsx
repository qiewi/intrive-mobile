import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { VideoCard } from '../components/ui/VideoCard';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { firestore, auth } from './firebaseConfig'; // Import Firestore and Auth
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface Video {
  id: string;
  title: string;
  url: string;
}

export default function ModuleDetail() {
  const { id, type } = useLocalSearchParams(); // Get the `id` and `type` from the URL
  const router = useRouter();

  const [watchedVideos, setWatchedVideos] = useState<string[]>([]); // Store watched video IDs
  const [moduleData, setModuleData] = useState<any | null>(null); // Store module data
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  useEffect(() => {
    const fetchUserWatchedVideos = async () => {
      try {
        const moduleId = parseInt(id as string, 10);

        if (isNaN(moduleId)) {
          console.error('Invalid module ID:', id);
          return;
        }

        const loggedInUser = auth.currentUser;
        if (!loggedInUser) {
          Alert.alert('Error', 'User not logged in.');
          router.push('/signin');
          return;
        }

        const userId = loggedInUser.uid;
        const userDoc = await getDoc(doc(firestore, 'users', userId));
        if (!userDoc.exists()) {
          Alert.alert('Error', 'User data not found.');
          return;
        }

        const userData = userDoc.data();
        const userModules = userData.modules || {};

        const userModule =
          type === 'integralModules'
            ? userModules.integralModule?.[moduleId]
            : userModules.derivativeModule?.[moduleId];

        if (userModule) {
          setWatchedVideos(userModule.watchedVideos || []);
        } else {
          setWatchedVideos([]);
        }
      } catch (error) {
        console.error('Error fetching user watched videos:', error);
        Alert.alert('Error', 'Could not load watched videos.');
      }
    };

    const fetchModuleData = async () => {
      try {
        const collectionName = type === 'integralModules' ? 'integralModules' : 'derivativeModules';
        const moduleDoc = await getDoc(doc(firestore, collectionName, id as string));

        if (moduleDoc.exists()) {
          setModuleData(moduleDoc.data());
        } else {
          Alert.alert('Error', 'Module not found.');
        }
      } catch (error) {
        console.error('Error fetching module data:', error);
        Alert.alert('Error', 'Could not load module details.');
      }
    };

    fetchUserWatchedVideos();
    fetchModuleData();
  }, [id, type, router]);

  if (!fontsLoaded || !moduleData) return null; // Render nothing until fonts and data are loaded

  const handleWatch = async (videoId: string, videoUrl: string) => {
    try {
      const loggedInUser = auth.currentUser;
      if (!loggedInUser) {
        Alert.alert('Error', 'You must be logged in to watch videos.');
        router.push('/signin');
        return;
      }
  
      const userId = loggedInUser.uid;
      const userDocRef = doc(firestore, 'users', userId);
      const userDocSnap = await getDoc(userDocRef);
  
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const userModules = userData.modules || {};
        const moduleKey = type === 'integralModules' ? 'integralModule' : 'derivativeModule';
        const moduleId = parseInt(id as string, 10);
  
        if (!userModules[moduleKey]?.[moduleId]) {
          Alert.alert('Error', 'Module data not found.');
          return;
        }
  
        const userModule = userModules[moduleKey]?.[moduleId];
        const watchedVideos = userModule.watchedVideos || [];
  
        // Add the videoId to watchedVideos if not already present
        if (!watchedVideos.includes(videoId)) {
          watchedVideos.push(videoId);
        }
  
        // Update Firestore with the new watchedVideos array
        await setDoc(
          userDocRef,
          {
            modules: {
              [moduleKey]: {
                [moduleId]: {
                  ...userModule,
                  watchedVideos,
                },
              },
            },
          },
          { merge: true }
        );
  
        // Update local state for UI
        setWatchedVideos([...watchedVideos]);
  
        // Navigate to the video page, passing the video URL
        router.push({ pathname: '/video-page', params: { videoUrl } });
      } else {
        Alert.alert('Error', 'User data not found.');
      }
    } catch (error) {
      console.error('Error updating watched videos:', error);
      Alert.alert('Error', 'Could not update watched videos.');
    }
  };
  

  const BackToHome = () => {
    router.push('/home');
  };

  const StartQuiz = () => {
    router.push({
      pathname: '/quiz-page',
      params: { id, type },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={BackToHome}>
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{moduleData.title}</Text>
      </View>

      <View style={styles.levelContainer}>
        <View style={styles.levelBadge}>
          <Text style={styles.levelText}>Level</Text>
          <Text style={[styles.levelText, styles.levelNumber]}>{moduleData.level}</Text>
        </View>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>Status</Text>
          <Text style={styles.statusValue}>{moduleData.status}</Text>
        </View>
      </View>

      <View style={styles.topicContainer}>
        <Text style={styles.topicLabel}>Topic</Text>
        <Text style={styles.topicTitle}>{moduleData.topic}</Text>
      </View>

      <Text style={styles.sectionTitle}>Video Material</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.videoScroll}>
        {moduleData.videos.map((video: Video) => (
          <VideoCard
            key={video.id}
            title={video.title}
            videoUrl={video.url}
            videoId={video.id}
            isWatched={watchedVideos.includes(video.id)}
            onWatch={() => handleWatch(video.id, video.url)}
          />
        ))}
      </ScrollView>

      <View style={styles.scoreContainer}>
        <View style={styles.scoreDetail}>
          <Text style={styles.scoreText}>Your Last Score</Text>
          <Text style={styles.scoreValue}>{moduleData.userScore || 0}/5</Text>
        </View>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: `${(moduleData.userScore / 5) * 100}%` }]} />
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.levelUpButton} onPress={StartQuiz}>
        <Text style={styles.levelUpText}>Level Up</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Poppins_600SemiBold',
    marginLeft: 10,
  },
  levelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 20,
  },
  levelBadge: {
    backgroundColor: '#009D60',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 24,
    padding: 12,
    width: 105,
    height: 105,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Poppins_400Regular',
  },
  levelNumber: {
    fontSize: 36,
    fontFamily: 'Poppins_600SemiBold',
  },
  statusBadge: {
    backgroundColor: '#F7CA15',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 24,
    padding: 12,
    paddingHorizontal: 20,
    flex: 1,
    marginLeft: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  statusText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
  },
  statusValue: {
    color: 'white',
    fontSize: 32,
    fontFamily: 'Poppins_600SemiBold',
  },
  topicContainer: {
    backgroundColor: '#F5F5F5',
    height: 128,
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  topicLabel: {
    color: '#666',
    marginBottom: 8,
    fontFamily: 'Poppins_400Regular',
  },
  topicTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 20,
  },
  videoScroll: {
    marginBottom: 10,
  },
  scoreContainer: {
    marginBottom: 40,
  },
  scoreText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 8,
  },
  scoreDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    marginBottom: 10,
  },
  progressContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 14,
    backgroundColor: '#E5E5E5',
    borderRadius: 50,
  },
  progress: {
    height: '100%',
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: '#00A67E',
    borderRadius: 50,
  },
  scoreValue: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
  },
  levelUpButton: {
    backgroundColor: '#F7CA15',
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 54,
    alignItems: 'center',
    marginHorizontal: 40,
    marginBottom: 40,
  },
  levelUpText: {
    color: 'black',
    fontSize: 28,
    fontFamily: 'Poppins_400Regular',
  },
});
