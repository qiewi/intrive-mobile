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
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

export default function SignUpScreen() {
  const router = useRouter();
  const db = getFirestore();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  if (!fontsLoaded) {
    return null;
  }

  const navigateLogin = () => {
    router.push('/signin');
  };

  const handleSignUp = async () => {
    if (!email || !password || !username) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      if (user) {
        await updateProfile(user, { displayName: username });
  
        await setDoc(doc(db, 'users', user.uid), {
          username: username,
          email: user.email,
          streaks: 0,
          level: 'Bronze',
          points: 0,
          badges: [],
        });
      }
  
      Alert.alert('Success', 'Account created successfully!');
      router.push('/signin');
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Error', 'The email address is already registered. Please use a different email.');
      } else {
        Alert.alert('Error', 'The email address is already registered. Please use a different email.');
      }
    }
  };  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Get Started</Text>
        <Text style={styles.subtitle}>Create an Account</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            placeholderTextColor="#A0A0A0"
            value={username}
            onChangeText={setUsername}
          />
        </View>
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
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry
            placeholderTextColor="#A0A0A0"
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
          <Text style={styles.loginButtonText}>Create Account</Text>
        </TouchableOpacity>
        <Text style={styles.registerText}>
          Already have an account?{' '}
          <Text style={styles.registerLink} onPress={navigateLogin}>
            Log In
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
    justifyContent: 'flex-end',
  },
  header: {
    marginBottom: 40,
    paddingHorizontal: 30,
    marginTop: 120,
  },
  title: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 37,
    color: '#FFFFFF',
    textAlign: 'left',
    marginBottom: 0,
    lineHeight: 48,
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
  loginButton: {
    backgroundColor: '#F7CA15',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 10,
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