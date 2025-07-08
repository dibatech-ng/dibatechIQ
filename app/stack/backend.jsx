import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useFonts, Chewy_400Regular } from '@expo-google-fonts/chewy';
import { useRouter } from 'expo-router';
import { useUserData } from '../../context/UserDataContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SelectLanguageScreen() {
  const [fontsLoaded] = useFonts({ Chewy_400Regular });
  const router = useRouter();
  const { setUserData } = useUserData();

  if (!fontsLoaded) return null;

  const languages = [
    { name: 'node js', icon: require('../../assets/node.png'), bgColor: '#3C873A' },
    { name: 'dotnet', icon: require('../../assets/dotnet.png'), bgColor: '#512BD4' },
  ];

  const handleSelect = async (language) => {
    // Save to context
    setUserData((prev) => ({
      ...prev,
      stack: 'backend',
      language,
    }));

    // Save to local storage
    try {
      await AsyncStorage.setItem('@user_stack', 'backend');
      await AsyncStorage.setItem('@user_language', language);
    } catch (err) {
      console.warn('Error saving backend language:', err);
    }

    router.push('/level');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>select language</Text>

      <View style={styles.grid}>
        {languages.map((lang, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { backgroundColor: lang.bgColor }]}
            onPress={() => handleSelect(lang.name)}
          >
            <Image source={lang.icon} style={styles.icon} />
            <Text style={styles.label}>{lang.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B463D',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    textAlign: 'center',
    fontFamily: 'Chewy_400Regular',
    marginBottom: 40,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '40%',
    aspectRatio: 1,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  icon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Chewy_400Regular',
    textTransform: 'lowercase',
    textAlign: 'center',
  },
});
