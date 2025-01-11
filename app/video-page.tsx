import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { AntDesign } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';

export default function VideoPage() {
  const router = useRouter();
  const { videoUrl } = useLocalSearchParams(); // Extract `videoUrl` from params

  // Ensure `videoUrl` is a string
  const url = Array.isArray(videoUrl) ? videoUrl[0] : videoUrl;

  const isWeb = Platform.OS === 'web'; // Check if the app is running on the web platform

  // Transform the YouTube URL into an embeddable format
  const getEmbedUrl = (originalUrl: string | undefined): string => {
    if (!originalUrl) return '';
    if (originalUrl.includes('watch?v=')) {
      return originalUrl.replace('watch?v=', 'embed/');
    }
    return originalUrl; // If already in embed format, return as-is
  };

  const embedUrl = getEmbedUrl(url);

  useEffect(() => {
    // Lock the screen orientation to landscape
    const lockOrientation = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    };

    // Unlock the orientation when leaving the page
    const unlockOrientation = async () => {
      await ScreenOrientation.unlockAsync();
    };

    lockOrientation();

    return () => {
      unlockOrientation();
    };
  }, []);

  if (!embedUrl) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No valid video URL provided.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Video Content */}
      {isWeb ? (
        <View style={styles.webFallback}>
          <iframe
            width="100%"
            height="100%"
            src={embedUrl} // Use the transformed embeddable URL
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </View>
      ) : (
        <WebView
          source={{ uri: embedUrl }} // Use the transformed embeddable URL
          style={styles.videoPlayer}
          allowsFullscreenVideo
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  webFallback: {
    flex: 1,
    backgroundColor: '#000',
  },
  videoPlayer: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});
