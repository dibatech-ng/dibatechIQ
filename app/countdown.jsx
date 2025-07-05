import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useFonts, Chewy_400Regular } from '@expo-google-fonts/chewy';

export default function CountdownScreen() {
  const [count, setCount] = useState(3);
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    Chewy_400Regular,
  });

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      router.replace('/qanda'); // use your actual route path
    }
  }, [count]);

  if (!fontsLoaded) return null;

  return (
    <ImageBackground
      source={require('../assets/bg2img.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.countText}>{count}</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#124731',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  countText: {
    fontSize: 100,
    color: 'white',
    fontFamily: 'Chewy_400Regular', // ✅ Apply Chewy font
  },
});
