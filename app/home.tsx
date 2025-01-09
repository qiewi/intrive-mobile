import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { QuizCard } from '../components/ui/QuizCard';
import { MaterialTabs } from '../components/ui/MaterialTabs';
import { QuizListItem } from '../components/ui/QuizListItem';
import { Navbar } from '../components/ui/Navbar';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { useRouter } from 'expo-router';
import { auth } from './firebaseConfig';

export default function Home() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('integral');
  const [username, setUsername] = useState('');

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  useEffect(() => {
    const loggedIn = auth.onAuthStateChanged((user) => {
      if (user) {
        setUsername(user.displayName || 'User');
      } else {
        setUsername('User');
      }
    });

    return () => loggedIn();
  }, []);

  const NavigateProfile = () => {
    router.push('/profile');
  };

  if (!fontsLoaded) {
    return null; // Return null until fonts are loaded
  }

  const continueQuizzes = [
    {
      title: 'Integral Tentu',
      level: 2,
      image: require('../assets/quiz/1.png'),
    },
    {
      title: 'Derivative Basic',
      level: 1,
      image: require('../assets/quiz/1.png'),
    },
  ];

  const latestQuizzes = [
    {
      title: 'Integral Tentu',
      level: 1,
      subtitle: 'Hubungannya dengan Notasi Sigma',
      image: require('../assets/quiz/1.png'),
    },
    {
      title: 'Integral Tentu',
      level: 1,
      subtitle: 'Pengenalan Dasar',
      image: require('../assets/quiz/1.png'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <TouchableOpacity onPress={NavigateProfile}>
          <View style={styles.header}>
            <View style={styles.profile}>
              <Image
                source={require('../assets/quiz/1.png')}
                style={styles.avatar}
              />
              <View style={styles.headerContainer}>
                <View style={styles.levelContainer}>
                  <Text style={styles.levelText}>My Level Progress</Text>
                  <View style={styles.xpContainer}>
                    <FontAwesome name="star" size={16} color="#FFB800" />
                    <Text style={styles.xpText}>373 XP</Text>
                  </View>
                </View>
                <View style={styles.progressBar}>
                  <View style={[styles.progress, { width: '60%' }]} />
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {/* Greeting */}
        <Text style={styles.greeting}>Hi, {username}!</Text>
        <Text style={styles.title}>Let's continue a quiz!</Text>

        {/* Continue Quiz Cards */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.cardsScroll}
          contentContainerStyle={styles.cardsContainer}
        >
          {continueQuizzes.map((quiz, index) => (
            <QuizCard
              key={index}
              title={quiz.title}
              level={quiz.level}
              image={quiz.image}
            />
          ))}
        </ScrollView>

        {/* Material Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Material</Text>
          <MaterialTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </View>

        {/* Latest Quiz Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Latest Quiz</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          {latestQuizzes.map((quiz, index) => (
            <QuizListItem
              key={index}
              title={quiz.title}
              level={quiz.level}
              subtitle={quiz.subtitle}
              image={quiz.image}
            />
          ))}
        </View>
      </ScrollView>

      {/* Reusable Navbar */}
      <Navbar activeTab="home" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
    paddingBottom: 80,
  },
  header: {
    padding: 16,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  headerContainer: {
    flex: 1,
    gap: 12,
  },
  levelContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  levelText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Poppins_400Regular',
  },
  xpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  xpText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    fontFamily: 'Poppins_600SemiBold',
  },
  progressBar: {
    height: 16,
    backgroundColor: '#E5E5E5',
    borderRadius: 2,
  },
  progress: {
    height: '100%',
    backgroundColor: '#009D60',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 4,
  },
  greeting: {
    fontSize: 16,
    color: '#666',
    marginLeft: 16,
    fontFamily: 'Poppins_400Regular',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 16,
    marginTop: 4,
    marginBottom: 16,
    fontFamily: 'Poppins_600SemiBold',
  },
  cardsScroll: {
    marginLeft: 16,
  },
  cardsContainer: {
    paddingRight: 16,
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    fontFamily: 'Poppins_600SemiBold',
  },
  seeAll: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Poppins_400Regular',
  },
});
