import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { GlobalText } from '../components/GlobalTextProvider';
import { Navbar } from '../components/ui/Navbar';
import Icon from 'react-native-vector-icons/FontAwesome';
import { firestore } from './firebaseConfig';
import { getDocs, collection } from 'firebase/firestore';

interface UserData {
  id: string;
  username: string;
  profilePic: any; // ProfilePic as object from Firestore
  points: number;
  streaks: number;
  position?: number; // Dynamically added property
}

export default function Leaderboard() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  const [topUsers, setTopUsers] = useState<UserData[]>([]);
  const [otherUsers, setOtherUsers] = useState<UserData[]>([]);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const usersSnapshot = await getDocs(collection(firestore, 'users'));
        const usersData: UserData[] = usersSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            username: data.username,
            profilePic: data.profilePic || null, // Handle missing profilePic
            points: data.points,
            streaks: data.streaks,
          };
        });

        // Sort users by points in descending order
        const sortedUsers = usersData.sort((a, b) => b.points - a.points);

        // Assign ranks and split top 3 and remaining users
        const topThree = sortedUsers.slice(0, 3).map((user, index) => ({
          ...user,
          position: index + 1,
        }));
        const remainingUsers = sortedUsers.slice(3);

        setTopUsers(topThree);
        setOtherUsers(remainingUsers);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };

    fetchLeaderboardData();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  const renderProfilePic = (profilePic: any) => {
    // Case 1: profilePic is an object (map) with a `uri` field
    if (profilePic && typeof profilePic === 'object' && profilePic.uri) {
      // Check if the `uri` is a local path (starts with '/assets')
      if (profilePic.uri.startsWith('/assets')) {
        return require('../assets/images/profpic.png'); // Local fallback image
      }
      // Use the `uri` for remote images
      return { uri: profilePic.uri };
    }
  
    // Case 2: profilePic is a string (custom profile pic)
    if (profilePic && typeof profilePic === 'string') {
      return { uri: profilePic }; // Directly use the string as a URI
    }
  
    // Case 3: Fallback to default profile picture
    return require('../assets/images/profpic.png');
  };
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <GlobalText style={styles.title}>Leaderboards</GlobalText>
      </View>

      {/* Podium Section */}
      <View style={styles.podiumSection}>
        <View style={styles.podiumContainer}>
          {/* #2 User */}
          {topUsers[1] && (
            <View style={[styles.podiumColumn, { alignItems: 'center' }]}>
              <Image
                source={renderProfilePic(topUsers[1].profilePic)}
                style={styles.avatar}
              />
              <GlobalText style={styles.userName}>{topUsers[1].username}</GlobalText>
              <GlobalText style={[styles.userXP, { color: '#E5B700' }]}>
                {topUsers[1].points} XP
              </GlobalText>
              <View style={[styles.podiumBox, { height: 140, backgroundColor: '#E5B700' }]}>
                <View style={styles.positionBadge}>
                  <GlobalText style={styles.positionText}>2</GlobalText>
                </View>
              </View>
            </View>
          )}

          {/* #1 User */}
          {topUsers[0] && (
            <View style={[styles.podiumColumn, { alignItems: 'center', marginHorizontal: 20 }]}>
              <Image
                source={renderProfilePic(topUsers[0].profilePic)}
                style={styles.avatar}
              />
              <GlobalText style={styles.userName}>{topUsers[0].username}</GlobalText>
              <GlobalText style={[styles.userXP, { color: '#009D60' }]}>
                {topUsers[0].points} XP
              </GlobalText>
              <View style={[styles.podiumBox, { height: 160, backgroundColor: '#009D60' }]}>
                <View style={styles.positionBadge}>
                  <GlobalText style={styles.positionText}>1</GlobalText>
                </View>
              </View>
            </View>
          )}

          {/* #3 User */}
          {topUsers[2] && (
            <View style={[styles.podiumColumn, { alignItems: 'center' }]}>
              <Image
                source={renderProfilePic(topUsers[2].profilePic)}
                style={styles.avatar}
              />
              <GlobalText style={styles.userName}>{topUsers[2].username}</GlobalText>
              <GlobalText style={[styles.userXP, { color: '#F7CA15' }]}>
                {topUsers[2].points} XP
              </GlobalText>
              <View style={[styles.podiumBox, { height: 120, backgroundColor: '#F7CA15' }]}>
                <View style={styles.positionBadge}>
                  <GlobalText style={styles.positionText}>3</GlobalText>
                </View>
              </View>
            </View>
          )}
        </View>
      </View>

      {/* List Section */}
      <ScrollView style={styles.listContainer}>
        {otherUsers.map((user, index) => (
          <View key={user.id} style={styles.listItem}>
            <View style={styles.listLeftSection}>
              <View style={styles.avatarWrapper}>
                <Image
                  source={renderProfilePic(user.profilePic)}
                  style={styles.listAvatar}
                />
                <View
                  style={[
                    styles.smallBadge,
                    { backgroundColor: index % 2 === 0 ? '#009D60' : '#F7CA15' },
                  ]}
                >
                  <GlobalText style={styles.smallBadgeText}>{index + 4}</GlobalText>
                </View>
              </View>
              <View style={styles.listContent}>
                <GlobalText style={styles.listName}>{user.username}</GlobalText>
                <GlobalText style={styles.listStreaks}>{user.streaks} Streaks</GlobalText>
              </View>
            </View>
            <View style={styles.xpContainer}>
              <Icon name="star" style={styles.starIcon} />
              <GlobalText style={styles.listXP}>{user.points} XP</GlobalText>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Navigation Bar */}
      <Navbar activeTab="leaderboard" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
    paddingBottom: 125,
  },
  header: {
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 30,
  },
  title: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 28,
  },
  podiumSection: {
    paddingHorizontal: 100,
    marginBottom: 30,
  },
  podiumContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  podiumColumn: {
    alignItems: 'center',
    width: '50%',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 4,
  },
  avatarWrapper: {
    position: 'relative',
  },
  smallBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    position: 'absolute',
    bottom: -2,
    right: -2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000000',
  },
  smallBadgeText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 10,
    color: '#FFFFFF',
  },
  userName: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: '#000',
  },
  userXP: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 15,
  },
  podiumBox: {
    width: '70%',
    marginTop: 9,
    borderWidth: 2,
    borderColor: '#000',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    position: 'relative',
  },
  positionBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 10,
    alignSelf: 'center',
  },
  positionText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: '#000',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 25,
    marginTop: -10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  listLeftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  listContent: {
    marginLeft: 15,
  },
  listName: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 15,
  },
  listStreaks: {
    fontFamily: 'Poppins_400Regular',
    marginTop: 2,
    fontSize: 13,
    color: '#666',
  },
  xpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    fontSize: 15,
    color: '#FFD700',
    marginRight: 6,
  },
  listXP: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 15,
  },
});