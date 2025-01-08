import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';

export default function SignInScreen() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sign in to your</Text>
        <Text style={styles.titleBold}>Account</Text>
        <Text style={styles.subtitle}>Access Your Account</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#A0A0A0"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry
            placeholderTextColor="#A0A0A0"
          />
        </View>
        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.registerText}>
          Don’t have an account?{' '}
          <Text style={styles.registerLink}>Register</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009D60',
    justifyContent: 'flex-start',
  },
  header: {
    marginBottom: 40,
    paddingHorizontal: 30,
    marginTop: 130,
  },
  title: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 37,
    color: '#FFFFFF',
    textAlign: 'left',
    marginBottom: 0,
    lineHeight: 48,
  },
  titleBold: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 37,
    color: '#FFFFFF',
    textAlign: 'left',
    marginTop: 3,
  },
  subtitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 23,
    color: 'rgba(255, 255, 255, 0.5)',
    textAlign: 'left',
    marginTop: 10,
  },
  form: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingVertical: 60,
    paddingHorizontal: 30,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  inputContainer: {
    marginBottom: 30,
  },
  label: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#000000',
    marginBottom: 8,
  },
  input: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: '#000000',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 35,
    marginTop: -15,
  },
  forgotPasswordText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 15,
    color: '#F7CA15',
  },
  loginButton: {
    backgroundColor: '#FFB200',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#000000',
  },
  loginButtonText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 19,
    color: '#000000',
  },
  registerText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 15,
    color: '#000000',
    textAlign: 'center',
  },
  registerLink: {
    fontFamily: 'Poppins_400Regular',
    color: '#009D60',
  },
});
