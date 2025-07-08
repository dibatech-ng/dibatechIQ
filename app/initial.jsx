import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function InitialScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          router.replace('/home');
        } else {
          router.replace('/index');
        }
      } catch (err) {
        console.error('Error reading AsyncStorage', err);
        router.replace('/index');
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0C4A3A' }}>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
}
