import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome for the lock icon
import { useRouter } from 'expo-router';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

interface QuizListItemProps {
  id: string;
  title: string;
  level: number;
  subtitle: string;
  image: any; // Use `any` to handle `require()` output
  type: string; // 'integral' or 'derivative'
  locked: boolean; // New prop to indicate locked status
}

export const QuizListItem = ({ id, title, level, subtitle, image, type, locked }: QuizListItemProps) => {
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) return null;

  const handlePress = () => {
    if (!locked) {
      const moduleType = type === 'integral' ? 'integralModules' : 'derivativeModules';
      router.push(`/module-detail?id=${id}&type=${moduleType}`);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, locked && styles.lockedContainer]}
      onPress={handlePress}
      disabled={locked} // Disable touch events if locked
    >
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, { fontFamily: 'Poppins_600SemiBold' }]}>{title}</Text>
        <Text style={[styles.level, { fontFamily: 'Poppins_400Regular' }]}>Level {level}</Text>
        <Text style={[styles.subtitle, { fontFamily: 'Poppins_400Regular' }]}>{subtitle}</Text>
      </View>
      <Feather name="chevron-right" size={20} color="#666" />

      {/* Lock overlay */}
      {locked && (
        <View style={styles.lockOverlay}>
          <FontAwesome name="lock" size={24} color="white" />
          <Text style={[styles.lockText, { fontFamily: 'Poppins_600SemiBold' }]}>Locked</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F8F9FA',
    gap: 12,
    marginBottom: 12,
    borderRadius: 12,
    position: 'relative', // To allow absolute positioning of the overlay
  },
  lockedContainer: {
    opacity: 0.9, // Dim the item if locked
  },
  imageContainer: {
    width: 64,
    height: 64,
    backgroundColor: '#009D60',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    color: '#000',
  },
  level: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  subtitle: {
    fontSize: 10,
    color: '#999',
    marginTop: 2,
  },
  lockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  lockText: {
    color: 'white',
    fontSize: 16,
    marginTop: 4,
  },
});
