import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { auth, firestore } from './firebaseConfig';
import { doc, setDoc, getDoc, Firestore } from "firebase/firestore";
import { signOut } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';

type Badge = {
  id: number;
  title: string;
  unlocked: boolean;
};

type UserData = {
  level: string;
  points: number;
  streaks: number;
  badges: Badge[];
};

const ProfileScreen = () => {
  const router = useRouter();
  const userId = auth.currentUser?.uid;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/');
  
      // Add a listener to intercept back navigation
      window.history.pushState(null, '', '/');
      const onPopStateHandler = (event: PopStateEvent) => {
        if (window.location.pathname !== '/') {
          router.replace('/');
        }
      };
  
      window.onpopstate = onPopStateHandler;
    } catch (error) {
      console.error('Error signing out: ', error);
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };
  

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  const [profileData, setProfileData] = useState<UserData>({
    level: "",
    points: 0,
    streaks: 0,
    badges: [],
  });

  const [profilePic, setProfilePic] = useState<string | null>(null);

  const fetchUserData = async () => {
    try {
      const docRef = doc(firestore, "users", auth.currentUser?.uid || "");
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const data = docSnap.data() as UserData;
        setProfileData(data);
      } else {
        console.log("Document not Found!");
      }
    } catch (error) {
      console.error("Error fetching data user:", error);
    }
  };

  useEffect(() => {
    if (auth.currentUser) {
      fetchUserData();
    }
  }, []);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
  
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0];
        const newProfilePicUri = selectedImage.uri;
  
        setProfilePic(newProfilePicUri);
  
        try {
          const docRef = doc(firestore, "users", auth.currentUser?.uid || "");
          await setDoc(docRef, { profilePic: newProfilePicUri }, { merge: true });
  
          console.log("Profile picture updated in Firestore.");
  
          Alert.alert("Success", "Profile picture updated successfully!");
        } catch (error) {
          console.error("Error updating profile picture:", error);
          Alert.alert("Error", "There was an issue updating your profile picture.");
        }
      } else {
        console.log("Image picking was canceled or failed.");
      }
    } else {
      alert("Permission to access media library is required!");
    }
  };

  useEffect(() => {
    const fetchProfilePic = async () => {
      if (userId) {
        try {
          const docRef = doc(firestore, "users", userId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            if (userData.profilePic) {
              setProfilePic(userData.profilePic);
            }
          } else {
            console.log("User document not found!");
          }
        } catch (error) {
          console.error("Error fetching profile picture:", error);
        }
      }
    };

    fetchProfilePic();
  }, [userId]);

  if (!fontsLoaded) {
    return null;
  }

  const BackToPreviousPage = () => {
    // Remove the browser's popstate handler temporarily for this navigation
    window.onpopstate = null;
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
        {/* Profile Picture with Change Button */}
        <View style={styles.avatarContainer}>
          <Image 
            source={profilePic ? { uri: profilePic } : require('../assets/images/profpic.png')} 
            style={styles.avatar} 
          />
          <TouchableOpacity style={styles.changePicButton} onPress={pickImage}>
            <Icon name="camera" style={styles.changePicIcon} />
          </TouchableOpacity>
        </View>
        <Text style={[styles.username, { fontFamily: 'Poppins_600SemiBold' }]}>{auth.currentUser?.displayName || 'User'}</Text>
        <Text style={[styles.handle, { fontFamily: 'Poppins_400Regular' }]}>{auth.currentUser?.email || 'email@example.com'}</Text>
        
        {/* Top Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text style={[styles.progressTitle, { fontFamily: 'Poppins_600SemiBold' }]}>My Level Progress</Text>
            <View style={styles.pxContainer}>
              <Icon name="star" style={styles.pxIcon} />
              <Text style={[styles.pxText, { fontFamily: 'Poppins_400Regular' }]}>{profileData.points} PX</Text>
            </View>
          </View>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progress,
                {
                  width: `${Math.min((profileData.points / 2200) * 100, 100)}%`,
                  borderWidth: profileData.points > 0 ? 2 : 0,
                },
              ]}
            />
          </View>
        </View>
      </View>

      {/* White Container for Bottom Content */}
      <ScrollView style={styles.whiteContainer}>
        {/* Streaks Section */}
        <TouchableOpacity style={styles.streakCard}>
            <View style={styles.streakContent}>
                <View style={styles.streakTextContainer}>
                <Text style={[styles.streakLabel, { fontFamily: 'Poppins_400Regular' }]}>You did</Text>
                <Text style={[styles.streakCount, { fontFamily: 'Poppins_600SemiBold' }]}>{profileData.streaks} streaks</Text>
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
              <Text style={[styles.statusValue, { fontFamily: 'Poppins_600SemiBold' }]}>{profileData.level}</Text>
            </View>
          </View>
          <View style={styles.statusCard}>
            <Image source={require('../assets/images/points.png')} style={styles.statusIcon} />
            <View>
              <Text style={[styles.statusLabel, { fontFamily: 'Poppins_400Regular' }]}>Points</Text>
              <Text style={[styles.statusValue, { fontFamily: 'Poppins_600SemiBold' }]}>{profileData.points}</Text>
            </View>
          </View>
        </View>

        {/* Level Progress */}
        <View style={styles.levelSection}>
          <Text style={[styles.sectionTitle, { fontFamily: 'Poppins_600SemiBold' }]}>My Level Progress</Text>
          <View style={styles.levelProgressBar}>
            <View
              style={[
                styles.levelProgress,
                {
                  width: `${Math.min((profileData.points / 2200) * 100, 100)}%`,
                  borderWidth: profileData.points > 0 ? 2 : 0,
                },
              ]}
            />
          </View>
        </View>

        {/* Badges Section */}
        <View style={styles.badgesSection}>
            <Text style={[styles.sectionTitle, { fontFamily: 'Poppins_600SemiBold' }]}>My Badges</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.badgesGrid}>
              {profileData.badges.map((badge) => (
                <View key={badge.id} style={styles.badgeContainer}>
                  {/* Badge Image */}
                  <View style={styles.badgeWrapper}>
                    <Image source={require('../assets/images/badge.png')} style={styles.badgeIcon} />
                    {!badge.unlocked && (
                      <>
                        <Image source={require('../assets/images/badge-mask.png')} style={styles.badgeMask} />
                        <View style={styles.lockContainer}>
                          <Image source={require('../assets/images/lock-icon.png')} style={styles.lockIcon} />
                        </View>
                      </>
                    )}
                  </View>
                  {/* Badge Title */}
                  <Text
                    style={[styles.badgeTitle, { color: badge.unlocked ? '#000' : '#A0A0A0' }]}
                  >
                    {badge.title}
                  </Text>
                </View>
              ))}
            </View>
            </ScrollView>
        </View>

        {/* Logout Button */}
      <View style={styles.logoutButtonContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </View>

      </ScrollView>
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
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 4,
    borderColor: 'black',
  },
  changePicButton: {
    position: 'absolute',
    bottom: 5,
    right: 0,
    backgroundColor: 'white',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black',
  },
  changePicIcon: {
    fontSize: 14,
    color: '#009D60',
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
    flexGrow: 1,
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
  },

  badgeWrapper: {
    width: 60,
    height: 70,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  badgeMask: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    opacity: 0.8,
  },
  
  lockContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  lockIcon: {
    width: 24,
    height: 32,
  },
  logoutButtonContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#000000',
  },
  logoutButtonText: {
    fontFamily: 'Poppins_600SemiBold',
    color: 'white',
    fontSize: 16,
  },
});

export default ProfileScreen;