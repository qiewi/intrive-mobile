import React from 'react';
import { Image, StyleSheet, Platform } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';

import { GlobalText, GlobalTextInput } from './GlobalTextProvider';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <GlobalText style={styles.titleText}>Welcome!</GlobalText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <GlobalText style={styles.subtitleText}>Step 1: Try it</GlobalText>
        <GlobalText>
          Edit <GlobalText style={styles.boldText}>app/(tabs)/index.tsx</GlobalText> to see changes.
          Press{' '}
          <GlobalText style={styles.boldText}>
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </GlobalText>{' '}
          to open developer tools.
        </GlobalText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  titleText: {
    fontSize: 24,
  },
  subtitleText: {
    fontSize: 18,
    fontWeight: '700',
  },
  boldText: {
    fontSize: 16,
    fontWeight: '700',
  },
});