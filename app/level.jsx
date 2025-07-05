import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useFonts, Chewy_400Regular } from '@expo-google-fonts/chewy';
import { useRouter } from 'expo-router';
import { useUserData } from '../context/UserDataContext'; // ✅ Import global context

export default function ProgrammingLevelScreen() {
  const [fontsLoaded] = useFonts({
    Chewy_400Regular,
  });

  const router = useRouter();
  const { userData, setUserData } = useUserData(); // ✅ Use context

  if (!fontsLoaded) return null;

  const handleSelectLevel = (level) => {
    setUserData({ ...userData, level }); // ✅ Save selected level
    router.push('/time');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Select programming level</Text>

      <TouchableOpacity style={styles.button} onPress={() => handleSelectLevel('Beginner')}>
        <Text style={styles.buttonText}>Beginner</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => handleSelectLevel('Intermediate')}>
        <Text style={styles.buttonText}>Intermediate</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => handleSelectLevel('Professional')}>
        <Text style={styles.buttonText}>Professional</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#0C4A3A',
    alignItems: 'center',
    paddingTop: 100,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    marginBottom: 40,
    fontFamily: 'Chewy_400Regular',
  },
  button: {
    backgroundColor: '#2DD4F7',
    width: '85%',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Montserrat',
  },
});
