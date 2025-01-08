import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_700Bold, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { useRouter } from 'expo-router'; // Import the useRouter hook

import { GlobalText } from '../components/GlobalTextProvider';

export default function HomeScreen() {
  const router = useRouter(); // Initialize the router

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleGetStartedPress = () => {
    router.push('/signin'); // Navigate to the signin page
  };

  return (
    <View style={styles.container}>
      {/* Title Section */}
      <View style={styles.titleContainer}>
        <GlobalText style={styles.titleText}>
          The Next Way of Learning{' '}
          <GlobalText style={styles.highlightText}>Integral & Derivative</GlobalText>
        </GlobalText>
      </View>

      {/* White Icon */}
      <Image
        source={require('@/assets/images/white-icon.png')} // Adjust the path to your image file
        style={styles.icon}
        resizeMode="contain"
      />

      {/* Button Section */}
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.button} onPress={handleGetStartedPress}>
          <GlobalText style={styles.buttonText}>Get Started</GlobalText>
        </TouchableOpacity>

        {/* Footer Section */}
        <GlobalText style={styles.footerText}>
          Already have an account? <GlobalText style={styles.loginText}>Login</GlobalText>
        </GlobalText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009D60',
    padding: 16,
    paddingHorizontal: 45,
  },
  titleContainer: {
    marginTop: 100,
    marginBottom: 340,
  },
  titleText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 40,
    textAlign: 'left',
    color: '#FFFFFF',
    lineHeight: 48,
  },
  highlightText: {
    fontFamily: 'Poppins_600SemiBold',
    color: '#F7CA15', // Yellow for emphasis
  },
  icon: {
    width: 400, // Adjust the width of the icon
    height: 480, // Adjust the height of the icon
    position: 'absolute',
    top: '45%',
    right: '30%',
    alignSelf: 'center',
    marginBottom: 40,
  },
  footerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '80%',
    backgroundColor: '#F7CA15', // Button color
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderColor: '#000000', // Black border for contrast
    borderWidth: 2,
    borderRadius: 54,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  buttonText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 28,
    color: '#000000',
  },
  footerText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#000000',
  },
  loginText: {
    color: '#FFFFFF',
  },
});
