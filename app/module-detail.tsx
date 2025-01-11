import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { VideoCard } from '../components/ui/VideoCard';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { integralModules } from './data/integralModules';
import { derivativeModules } from './data/derivativeModules';

export default function ModuleDetail() {
  const { id, type } = useLocalSearchParams(); // Get the `id` and `type` from the URL
  const router = useRouter();

  // Determine the correct module data based on `type`
  const moduleData =
    type === 'integralModules'
      ? integralModules.find((module) => module.id === id)
      : derivativeModules.find((module) => module.id === id);

  if (!moduleData) return null; // If no matching module is found, return null

  const [watchedVideos, setWatchedVideos] = useState(new Set(moduleData.videos.map(() => false)));

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) return null; // Render nothing until fonts are loaded

  const handleWatch = (videoUrl: string) => {
    router.push({ pathname: '/video-page', params: { videoUrl } }); // Navigate to VideoPage with video URL
  };

  const BackToHome = () => {
    router.push('/home');
  };

  const StartQuiz = () => {
    router.push({
      pathname: '/quiz-page',
      params: { id: moduleData.id, type }, // Pass both id and type
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={BackToHome}>
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{moduleData.title}</Text>
      </View>

      {/* Level and Status */}
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

      {/* Topic */}
      <View style={styles.topicContainer}>
        <Text style={styles.topicLabel}>Topic</Text>
        <Text style={styles.topicTitle}>{moduleData.topic}</Text>
      </View>

      {/* Video Material */}
      <Text style={styles.sectionTitle}>Video Material</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.videoScroll}>
        {moduleData.videos.map((video) => (
          <VideoCard
            key={video.id}
            title={video.title}
            videoUrl={video.url}
            isWatched={false}
            onWatch={() => handleWatch(video.url)} // Pass video URL to the handler
          />
        ))}
      </ScrollView>

      {/* Score Section */}
      <View style={styles.scoreContainer}>
        <View style={styles.scoreDetail}>
          <Text style={styles.scoreText}>Your Last Score</Text>
          <Text style={styles.scoreValue}>{moduleData.userScore}/5</Text>
        </View>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: `${(moduleData.userScore / 5) * 100}%` }]} />
          </View>
        </View>
      </View>

      {/* Level Up Button */}
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
