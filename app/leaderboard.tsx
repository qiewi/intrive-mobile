import React from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { GlobalText } from '../components/GlobalTextProvider';
import { Navbar } from '../components/ui/Navbar';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Leaderboard() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const topUsers = [
    { id: 2, name: 'Ghyani', xp: 323, position: 2 },
    { id: 1, name: 'Rizqi', xp: 379, position: 1 },
    { id: 3, name: 'Belvie', xp: 278, position: 3 },
  ].sort((a, b) => {
    const podiumOrder: { [key: number]: number } = { 2: 0, 1: 1, 3: 2 };
    return podiumOrder[a.position] - podiumOrder[b.position];
  });

  const otherUsers = Array(7).fill({
    name: 'Lively',
    streaks: '12 Streaks',
    xp: 250,
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <GlobalText style={styles.title}>Leaderboards</GlobalText>
      </View>

      {/* Podium Section */}
      <View style={styles.podiumSection}>
      <View style={styles.podiumContainer}>
        {topUsers.map((user) => (
            <View key={user.id} style={styles.podiumColumn}>
            {/* Profile and Info */}
            <Image
                source={require('../assets/images/avatar.png')}
                style={[
                styles.avatar,
                {
                    marginBottom: user.position === 1 ? 8 : user.position === 2 ? 8 : 8,
                },
                ]}
            />
            <GlobalText style={styles.userName}>{user.name}</GlobalText>
            <GlobalText
                style={[
                styles.userXP,
                { color:
                    user.position === 1
                        ? '#009D60'
                        : user.position === 2
                        ? '#E5B700'
                        : '#F7CA15', },
                ]}
            >
                {user.xp} XP
            </GlobalText>

            {/* Podium Box */}
            <View
                style={[
                    styles.podiumBox,
                    {
                        height: user.position === 1 ? 160 : user.position === 2 ? 140 : 120,
                        backgroundColor:
                            user.position === 1
                                ? '#009D60'
                                : user.position === 2
                                ? '#E5B700'
                                : '#F7CA15',
                    },
                ]}
            >
                <View style={styles.positionBadge}>
                <GlobalText style={styles.positionText}>{user.position}</GlobalText>
                </View>
            </View>
            </View>
        ))}
        </View>
      </View>

      {/* List Section */}
      <ScrollView style={styles.listContainer}>
        {otherUsers.map((user, index) => (
          <View key={index} style={styles.listItem}>
            <View style={styles.listLeftSection}>
              <Image
                source={require('../assets/images/avatar.png')}
                style={styles.listAvatar}
              />
              <View style={styles.listContent}>
                <GlobalText style={styles.listName}>{user.name}</GlobalText>
                <GlobalText style={styles.listStreaks}>{user.streaks}</GlobalText>
              </View>
            </View>
            <View style={styles.xpContainer}>
              <Icon name="star" style={styles.starIcon} />
              <GlobalText style={styles.listXP}>{user.xp} XP</GlobalText>
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
  podiumContent: {
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 4,
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