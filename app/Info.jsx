import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ImageBackground,
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

import {
  useFonts as useMontserrat,
  Montserrat_400Regular,
  Montserrat_600SemiBold,
} from '@expo-google-fonts/montserrat';

import {
  useFonts as useChewy,
  Chewy_400Regular,
} from '@expo-google-fonts/chewy';

export default function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const [montserratLoaded] = useMontserrat({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
  });

  const [chewyLoaded] = useChewy({
    Chewy_400Regular,
  });

  if (!montserratLoaded || !chewyLoaded) {
    return (
      <View style={styles.loading}>
        <Text style={{ color: '#fff' }}>Loading fonts...</Text>
      </View>
    );
  }

  const handleSubmit = async () => {
    if (!name || !email || !password) {
      Alert.alert('Please fill all fields');
      return;
    }

    try {
      await AsyncStorage.setItem('user', JSON.stringify({ name, email }));

      router.push('/stack');
    } catch (error) {
      Alert.alert('Storage Error', error.message);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/bgimg.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />

        <Text style={styles.header}>Let’s get started</Text>
        <Text style={styles.subHeader}>Personalize your experience</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            placeholder="e.g john"
            style={styles.input}
            placeholderTextColor="#555"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="e.g johndoe@mail.com"
            style={styles.input}
            keyboardType="email-address"
            placeholderTextColor="#555"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Password"
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#555"
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>CONTINUE</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 28,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'Chewy_400Regular',
  },
  subHeader: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'Montserrat_400Regular',
  },
  inputContainer: {
    marginBottom: 30,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 6,
    fontFamily: 'Montserrat_600SemiBold',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 20,
    fontSize: 16,
    fontFamily: 'Montserrat_400Regular',
  },
  button: {
    backgroundColor: '#B0E57C',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Montserrat_600SemiBold',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0C4A3A',
  },
});
