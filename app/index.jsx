// app/index.jsx
import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function IndexScreen() {
  const router = useRouter();

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const stored = await AsyncStorage.getItem('@user_info');
        const userInfo = JSON.parse(stored);

        setTimeout(() => {
          if (userInfo?.hasCompletedOnboarding) {
            router.replace('/home'); // ✅ Already onboarded
          } else {
            router.replace('/intro'); // ✅ Show intro screen
          }
        }, 1500);
      } catch (error) {
        console.warn('Splash error:', error);
        router.replace('/intro'); // ✅ Fallback to intro
      }
    };

    checkOnboarding();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/splash-icon.png')} style={styles.logo} />
      <Text style={styles.sponsored}>Sponsored by dibatech.ng</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  sponsored: {
    position: 'absolute',
    bottom: 30,
    fontSize: 14,
    color: '#888',
  },
});
