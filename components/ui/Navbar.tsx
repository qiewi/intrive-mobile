import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

interface NavbarProps {
  activeTab: string;
}

export const Navbar = ({ activeTab }: NavbarProps) => {
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) return null;

  return (
    <View style={styles.bottomNavContainer}>
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={[styles.navItem, activeTab === 'home' && styles.navItemActive]}
          onPress={() => router.push('/home')}
        >
          <Feather name="home" size={24} color={activeTab === 'home' ? 'white' : '#666'} />
          <Text style={[styles.navText, activeTab === 'home' && styles.navTextActive]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navItem, activeTab === 'leaderboard' && styles.navItemActive]}
          onPress={() => router.push('/leaderboard')}
        >
          <Feather name="award" size={24} color={activeTab === 'leaderboard' ? 'white' : '#666'} />
          <Text
            style={[
              styles.navText,
              activeTab === 'leaderboard' && styles.navTextActive,
            ]}
          >
            Leaderboard
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navItem, activeTab === 'profile' && styles.navItemActive]}
          onPress={() => router.push('/profile')}
        >
          <Feather name="user" size={24} color={activeTab === 'profile' ? 'white' : '#666'} />
          <Text style={[styles.navText, activeTab === 'profile' && styles.navTextActive]}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNavContainer: {
    position: 'absolute',
    bottom: 42,
    left: "10%",
    right: "10%",
    alignItems: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 100,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  navItem: {
    alignItems: 'center',
    padding: 15,
    flexDirection: 'column',
    gap: 6,
    paddingHorizontal: 20,
  },
  navItemActive: {
    backgroundColor: '#009D60',
    borderRadius: 80,
  },
  navText: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Poppins_400Regular',
  },
  navTextActive: {
    color: 'white',
    fontFamily: 'Poppins_600SemiBold',
  },
});
