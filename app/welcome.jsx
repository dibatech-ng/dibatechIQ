import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace('/home'); // Navigate to home after delay
    }, 2500); // 2.5 seconds

    return () => clearTimeout(timeout);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>Welcome to DibaTech IQ</Text>
      <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C4A3A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Chewy_400Regular',
  },
});
