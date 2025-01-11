import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Linking } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

interface VideoCardProps {
  title: string;
  videoUrl: string;
  isWatched: boolean;
  onWatch?: () => void;
}

export const VideoCard = ({ title, videoUrl, isWatched, onWatch }: VideoCardProps) => {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) return null;

  return (
    <View style={styles.videoCard}>
      <View style={styles.header}>
        <Text style={styles.videoTitle}>Judul</Text>
        <Text
          style={styles.videoContent}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
      </View>
      <View style={styles.videoCardBottom}>
        <AntDesign
          name="checkcircle"
          size={20}
          color={isWatched ? '#FFD700' : '#E5E5E5'}
        />
        <TouchableOpacity
          style={styles.watchButton}
          onPress={() => {
            onWatch && onWatch();
          }}
        >
          <Text style={styles.watchButtonText}>Watch</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  videoCard: {
    backgroundColor: '#009D60',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 12,
    padding: 12,
    paddingHorizontal: 20,
    width: 260,
    height: 150,
    marginRight: 10,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 16,
  },
  videoTitle: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    opacity: 0.8,
  },
  videoContent: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
  },
  videoCardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  watchButton: {
    backgroundColor: '#F7CA15',
    borderWidth: 1,
    borderColor: 'black',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  watchButtonText: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
  },
});
