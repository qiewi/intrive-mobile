import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { useRouter } from 'expo-router';

interface QuizListItemProps {
  title: string;
  level: number;
  subtitle: string;
  image: any; // Use `any` to handle `require()` output
  onPress?: () => void;
}

export const QuizListItem = ({ title, level, subtitle, image, onPress }: QuizListItemProps) => {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  const handlePress = () => {
    router.push('/module-detail');
  };

  if (!fontsLoaded) return null;

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      {/* Green Container with Padding */}
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} resizeMode="contain" />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.level}>Level {level}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      <Feather name="chevron-right" size={20} color="#666" />
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
  },
  imageContainer: {
    width: 64, // Adjust size to match your design
    height: 64,
    backgroundColor: '#009D60', // Green background
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8, // Add padding inside the container
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
    fontFamily: 'Poppins_600SemiBold',
    color: '#000',
  },
  level: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#666',
    marginTop: 2,
  },
  subtitle: {
    fontSize: 10,
    fontFamily: 'Poppins_400Regular',
    color: '#999',
    marginTop: 2,
  },
});
