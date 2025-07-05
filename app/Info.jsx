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
} from 'react-native';

import { useRouter } from 'expo-router';
import { useUserData } from '../context/UserDataContext'; // ✅ Import context

import {
  useFonts as useMontserrat,
  Montserrat_400Regular,
  Montserrat_600SemiBold,
} from '@expo-google-fonts/montserrat';

import {
  useFonts as useChewy,
  Chewy_400Regular,
} from '@expo-google-fonts/chewy';

export default function InfoScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { userData, setUserData } = useUserData(); // ✅ Use context

  const [montserratLoaded] = useMontserrat({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
  });

  const [chewyLoaded] = useChewy({
    Chewy_400Regular,
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isNameValid = name.trim().length >= 2;
  const isEmailValid = emailRegex.test(email);
  const isPasswordValid = password.length >= 8;
  const isFormValid = isNameValid && isEmailValid && isPasswordValid;

  if (!montserratLoaded || !chewyLoaded) {
    return (
      <View style={styles.loading}>
        <Text style={{ color: '#fff' }}>Loading fonts...</Text>
      </View>
    );
  }

  const handleSubmit = () => {
    // ✅ Save data to context
    setUserData({
      ...userData,
      name,
      email,
    });
    router.push('/stack'); // Navigate to stack screen
  };

  const renderIcon = (isValid) => (
    <Text style={[styles.icon, { color: isValid ? 'green' : 'red' }]}>
      {isValid ? '✓' : '✕'}
    </Text>
  );

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
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="e.g john"
              style={styles.input}
              placeholderTextColor="#555"
              value={name}
              onChangeText={setName}
            />
            {name.length > 0 && renderIcon(isNameValid)}
          </View>
          {!isNameValid && name.length > 0 && (
            <Text style={styles.error}>Name must be at least 2 characters</Text>
          )}

          <Text style={styles.label}>Email</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="e.g johndoe@mail.com"
              style={styles.input}
              keyboardType="email-address"
              placeholderTextColor="#555"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />
            {email.length > 0 && renderIcon(isEmailValid)}
          </View>
          {!isEmailValid && email.length > 0 && (
            <Text style={styles.error}>Enter a valid email address</Text>
          )}

          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Password"
              secureTextEntry
              style={styles.input}
              placeholderTextColor="#555"
              value={password}
              onChangeText={setPassword}
            />
            {password.length > 0 && renderIcon(isPasswordValid)}
          </View>
          {!isPasswordValid && password.length > 0 && (
            <Text style={styles.error}>Password must be at least 8 characters</Text>
          )}
        </View>

        {isFormValid && (
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>CONTINUE</Text>
          </TouchableOpacity>
        )}
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
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    paddingRight: 40,
    marginBottom: 5,
    fontSize: 16,
    fontFamily: 'Montserrat_400Regular',
  },
  icon: {
    position: 'absolute',
    right: 16,
    top: 16,
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    color: '#ffaaaa',
    marginBottom: 10,
    fontSize: 13,
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
    marginTop: 10,
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
