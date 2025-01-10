import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { auth } from './firebaseConfig';

const ProfileScreen = () => {
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const badges = [
    { id: 1, title: 'Super\nStar' },
    { id: 2, title: 'Quiz\nChampion' },
    { id: 3, title: 'Math Wiz\nKid' },
    { id: 4, title: 'Science \nGang' },
    { id: 5, title: 'Language Master' },
    { id: 6, title: 'Tech Guru' },
    { id: 7, title: 'Sports Enthusiast' },
    { id: 8, title: 'Art Creator' },
    { id: 9, title: 'Music Lover' },
    { id: 10, title: 'Adventure Seeker' },
  ];

  const BackToPreviousPage = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Close Button */}
      <TouchableOpacity style={styles.closeButton} onPress={BackToPreviousPage}>
        <Text style={[styles.closeButtonText, { fontFamily: 'Poppins_600SemiBold' }]}>✕</Text>
      </TouchableOpacity>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image source={require('../assets/images/avatar.png')} style={styles.avatar} />
        <Text style={[styles.username, { fontFamily: 'Poppins_600SemiBold' }]}>{auth.currentUser?.displayName || 'User'}</Text>
        <Text style={[styles.handle, { fontFamily: 'Poppins_400Regular' }]}>{auth.currentUser?.email || 'email@example.com'}</Text>
        
        {/* Top Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text style={[styles.progressTitle, { fontFamily: 'Poppins_600SemiBold' }]}>My Level Progress</Text>
            <View style={styles.pxContainer}>
                <Icon name="star" style={styles.pxIcon} />
                <Text style={[styles.pxText, { fontFamily: 'Poppins_400Regular' }]}>373 PX</Text>
            </View>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: '34%' }]} />
          </View>
        </View>
      </View>

      {/* White Container for Bottom Content */}
      <View style={styles.whiteContainer}>
        {/* Streaks Section */}
        <TouchableOpacity style={styles.streakCard}>
            <View style={styles.streakContent}>
                <View style={styles.streakTextContainer}>
                <Text style={[styles.streakLabel, { fontFamily: 'Poppins_400Regular' }]}>You did</Text>
                <Text style={[styles.streakCount, { fontFamily: 'Poppins_600SemiBold' }]}>6 streaks</Text>
                </View>
                <View style={styles.streakImageContainer}>
                <Image source={require('../assets/images/streakImage.png')} style={styles.streakImage} />
                </View>
            </View>
            <Text style={[styles.arrowIcon, { fontFamily: 'Poppins_400Regular' }]}>›</Text>
        </TouchableOpacity>

        {/* Status Cards */}
        <View style={styles.statusContainer}>
          <View style={styles.statusCard}>
            <Image source={require('../assets/images/level.png')} style={styles.statusIcon} />
            <View>
              <Text style={[styles.statusLabel, { fontFamily: 'Poppins_400Regular' }]}>Level</Text>
              <Text style={[styles.statusValue, { fontFamily: 'Poppins_600SemiBold' }]}>Bronze</Text>
            </View>
          </View>
          <View style={styles.statusCard}>
            <Image source={require('../assets/images/points.png')} style={styles.statusIcon} />
            <View>
              <Text style={[styles.statusLabel, { fontFamily: 'Poppins_400Regular' }]}>Points</Text>
              <Text style={[styles.statusValue, { fontFamily: 'Poppins_600SemiBold' }]}>373</Text>
            </View>
          </View>
        </View>

        {/* Level Progress */}
        <View style={styles.levelSection}>
          <Text style={[styles.sectionTitle, { fontFamily: 'Poppins_600SemiBold' }]}>My Level Progress</Text>
          <View style={styles.levelProgressBar}>
            <View style={[styles.levelProgress, { width: '34%' }]} />
          </View>
        </View>

        {/* Badges Section */}
        <View style={styles.badgesSection}>
            <Text style={[styles.sectionTitle, { fontFamily: 'Poppins_600SemiBold' }]}>My Badges</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={styles.badgesGrid}>
                {badges.map((badge) => (
                    <View key={badge.id} style={styles.badgeContainer}>
                    <Image source={require('../assets/images/badge.png')} style={styles.badgeIcon} />
                    <Text style={[styles.badgeTitle, { fontFamily: 'Poppins_400Regular' }]}>{badge.title}</Text>
                    </View>
                ))}
                </View>
            </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00A86B',
  },
  closeButton: {
    position: 'absolute',
    right: 40,
    top: 50,
    zIndex: 1,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 24,
  },
  profileSection: {
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  username: {
    color: 'white',
    fontSize: 19,
    fontWeight: 'bold',
  },
  handle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 15,
  },
  progressContainer: {
    width: '100%',
    marginTop: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressTitle: {
    color: 'white',
    fontSize: 15,
  },
  progressBar: {
    height: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 8,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#000000',
  },
  pxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pxIcon: {
    fontSize: 14,
    color: '#FFD700', 
    marginRight: 5,
  },
  pxText: {
    color: 'white',
    fontSize: 15,
  },
  whiteContainer: {
    backgroundColor: 'white',
    marginTop: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  streakCard: {
    backgroundColor: '#00A86B',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#000000',
  },
  streakContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  streakTextContainer: {
    flexDirection: 'column',
  },
  streakLabel: {
    color: 'white',
    fontSize: 16,
  },
  streakCount: {
    color: 'white',
    fontSize: 23,
    fontWeight: 'bold',
  },
  streakImageContainer: {
    marginLeft: 'auto',
    marginRight: 10,
  },
  streakImage: {
    width: 50, 
    height: 50,
  },
  arrowIcon: {
    color: 'white',
    fontSize: 40,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statusCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
  },
  statusIcon: {
    width: 44,
    height: 44,
    marginRight: 10,
  },
  statusLabel: {
    color: '#666',
    fontSize: 16,
  },
  statusValue: {
    color: '#333',
    fontSize: 23,
    fontWeight: 'bold',
  },
  levelSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  levelProgressBar: {
    height: 34,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    overflow: 'hidden',
  },
  levelProgress: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#000000',
  },
  badgesSection: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  
  badgesGrid: {
    flexDirection: 'row',
    justifyContent: 'flex-start', 
    flexWrap: 'nowrap',
  },
  
  badgeContainer: {
    width: 70,
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 5,
  },
  
  badgeIcon: {
    width: 60,
    height: 70, 
    marginBottom: 5,
  },
  
  badgeTitle: {
    color: '#333',
    fontSize: 12,
    textAlign: 'center',
  }
});

export default ProfileScreen;