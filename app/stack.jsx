import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

// Import SVGs
import FrontendIcon from '../assets/frontend.svg';
import BackendIcon from '../assets/backend.svg';
import FullstackIcon from '../assets/fullstack.svg';

import { useRouter } from 'expo-router';

export default function ChooseStackScreen() {
  const router = useRouter();

  const handleSelect = (stack) => {
    router.push(`/stack/${stack}`); // e.g. navigates to /stack/fullstack
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Choose stack</Text>

        {/* Full-stack Developer */}
        <TouchableOpacity style={styles.option} onPress={() => handleSelect('fullstack')}>
          <View style={[styles.image, { backgroundColor: '#A348C3' }]}>
            <FullstackIcon width={60} height={60} />
          </View>
          <Text style={styles.label}>Full-stack developer</Text>
        </TouchableOpacity>

        {/* Front-end Developer */}
        <TouchableOpacity style={styles.option} onPress={() => handleSelect('frontend')}>
          <View style={[styles.image, { backgroundColor: '#0B60F4' }]}>
            <FrontendIcon width={60} height={60} />
          </View>
          <Text style={styles.label}>Front-end developer</Text>
        </TouchableOpacity>

        {/* Back-end Developer */}
        <TouchableOpacity style={styles.option} onPress={() => handleSelect('backend')}>
          <View style={[styles.image, { backgroundColor: '#E53935' }]}>
            <BackendIcon width={60} height={60} />
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
    fontFamily: 'Cochin', // Optional: Replace with custom font if needed
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
  label: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
});
