import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

interface QuizCardProps {
  id: string;
  type: string;
  title: string;
  level: number;
  image: any; // Use `any` for require() image type
}

export const QuizCard = ({ id, type, title, level, image }: QuizCardProps) => {
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) return null;

  const handleNavigation = () => {
    const moduleType = type === 'integral' ? 'integralModules' : 'derivativeModules';
    router.push(`/module-detail?id=${id}&type=${moduleType}`);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handleNavigation}>
      <View style={styles.content}>
        {/* Title and Level */}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.level}>Level {level}</Text>

        {/* Progress Bar Example (Optional) */}
        <View style={styles.progressBar}>
          <View style={styles.progress} />
        </View>

        {/* Image Container */}
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.image} resizeMode="contain" />
        </View>

        {/* Button */}
        <TouchableOpacity style={styles.button} onPress={handleNavigation}>
          <Text style={styles.buttonText}>Let's Go</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 300,
    height: 160,
    marginRight: 16,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 16,
    backgroundColor: '#009D60',
    padding: 16,
    overflow: 'hidden', // Clip content inside the card
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
    color: 'white',
    marginBottom: 4,
  },
  level: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: 'white',
    opacity: 0.8,
  },
  progressBar: {
    height: 8,
    width: '50%',
    backgroundColor: '#E5E5E5',
    borderRadius: 4,
    marginVertical: 8,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    width: '60%', // Adjust the width to represent progress
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    backgroundColor: '#FFB800',
  },
  imageContainer: {
    position: 'absolute',
    bottom: -30, // Adjust the vertical position
    right: -30, // Adjust the horizontal position
    width: 140,
    height: 140,
    borderRadius: 70, // Make the container circular if needed
    overflow: 'hidden', // Clip overflow content
  },
  image: {
    width: '100%',
    height: '100%',
  },
  button: {
    backgroundColor: '#F7CA15',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginTop: 'auto',
  },
  buttonText: {
    fontFamily: 'Poppins_600SemiBold',
    color: 'black',
  },
});
