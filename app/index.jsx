// app/index.jsx
import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // ✅ white background
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 300, // ✅ larger image
    height: 300,
    resizeMode: 'contain',
  },
});
