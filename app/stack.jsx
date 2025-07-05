import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';

import { useRouter } from 'expo-router';
import { useUserData } from '../context/UserDataContext'; // ✅ Import context

import frontendImg from '../assets/frontend.png';
import backendImg from '../assets/backend.png';
import fullstackImg from '../assets/fullstack.png';

export default function ChooseStackScreen() {
  const router = useRouter();
  const { userData, setUserData } = useUserData(); // ✅ Use context

  const handleSelect = (stack) => {
    // ✅ Save selected stack
    setUserData({ ...userData, stack });

    // ✅ Continue with your route logic
    router.push(`/stack/${stack}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Choose stack</Text>

        <TouchableOpacity style={styles.option} onPress={() => handleSelect('fullstack')}>
          <View style={[styles.image, { backgroundColor: '#A348C3' }]}>
            <Image source={fullstackImg} style={styles.icon} />
          </View>
          <Text style={styles.label}>Full-stack developer</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => handleSelect('frontend')}>
          <View style={[styles.image, { backgroundColor: '#0B60F4' }]}>
            <Image source={frontendImg} style={styles.icon} />
          </View>
          <Text style={styles.label}>Front-end developer</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => handleSelect('backend')}>
          <View style={[styles.image, { backgroundColor: '#E53935' }]}>
            <Image source={backendImg} style={styles.icon} />
          </View>
          <Text style={styles.label}>Back-end developer</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C4A3A',
  },
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
    fontFamily: 'Cochin',
  },
  option: {
    alignItems: 'center',
    marginBottom: 40,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  icon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  label: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
});
