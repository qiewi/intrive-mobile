import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { useRouter } from 'expo-router';
import { auth } from './firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FontAwesome } from '@expo/vector-icons';

export default function SignInScreen() {
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  if (!fontsLoaded) {
    return null;
  }

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      Alert.alert('Success', 'Login successful!');
      router.push('/home');
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        Alert.alert('Error', 'Your email is invalid or the password is incorrect. Please try again.');
      } else if (error.code === 'auth/wrong-password') {
        Alert.alert('Error', 'Your email is invalid or the password is incorrect. Please try again.');
      } else {
        Alert.alert('Error', 'Your email is invalid or the password is incorrect. Please try again.');
      }
    }
  };

  const navigateRegister = () => {
    router.push('/signup');
  };

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
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              secureTextEntry={!passwordVisible}
              placeholderTextColor="#A0A0A0"
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
              style={styles.eyeIcon}
            >
              <FontAwesome 
                name={passwordVisible ? "eye" : "eye-slash"} 
                size={24} 
                color="#A0A0A0" 
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.registerText}>
          Don’t have an account?{' '}
          <Text style={styles.registerLink} onPress={navigateRegister}>
            Register
          </Text>
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
    marginTop: 160,
  },
  title: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 37,
    color: '#FFFFFF',
    textAlign: 'left',
    marginBottom: 0,
    lineHeight: 40,
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
    marginTop: 4,
  },
  form: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingVertical: 60,
    paddingHorizontal: 30,
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
  passwordContainer: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 20,
    top: 20,
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
    backgroundColor: '#F7CA15',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 25,
    borderWidth: 2,
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