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
import { integralModules } from './data/integralModules';
import { derivativeModules } from './data/derivativeModules';

export default function Home() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('integral'); // Default to 'integral'
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
    return null; // Render nothing until fonts are loaded
  }

  // Filter modules based on activeTab (either 'integral' or 'derivative')
  const filteredModules =
    activeTab === 'integral' ? integralModules : derivativeModules;

  // Combine all modules for the Continue Quiz Cards section
  const allModules = [...integralModules, ...derivativeModules];

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
                    <Text style={styles.xpText}>373 PX</Text>
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
          {allModules.map((module) => (
            <QuizCard
              key={module.id}
              id={module.id}
              type={module.type === 'integral' ? 'integralModules' : 'derivativeModules'} 
              title={module.title}
              level={module.level}
              image={require('../assets/quiz/1.png')} 
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
            <Text style={styles.sectionTitle}>Modules</Text>
          </View>
          {filteredModules.map((module) => (
            <QuizListItem
              key={module.id}
              id={module.id}
              title={module.title}
              level={module.level}
              subtitle={module.topic}
              image={require('../assets/quiz/1.png')} // Replace with dynamic images if available
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
    paddingLeft: 16,
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
});
