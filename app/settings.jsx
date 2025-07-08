import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import BottomNavigation from '../components/BottomNavigation';
import { Ionicons, Entypo, Feather, AntDesign } from '@expo/vector-icons';
import { useUserData } from '../context/UserDataContext';

export default function SettingsScreen() {
  const { userData, setUserData } = useUserData();
  const [imageUri, setImageUri] = useState(userData.profileImage || null);
  const router = useRouter();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      aspect: [1, 1],
      allowsEditing: true,
    });

    if (!result.canceled) {
      const selectedUri = result.assets[0].uri;
      setImageUri(selectedUri);
      setUserData(prev => ({ ...prev, profileImage: selectedUri }));
    }
  };

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            await AsyncStorage.clear(); // Clear all stored data
            setUserData({}); // Reset global context
            router.replace('/index'); // Navigate to onboarding/index screen
          } catch (err) {
            console.warn('Logout error:', err);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.screen}>
      <ImageBackground
        source={require('../assets/bg2img.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.safeArea}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.title}>Settings</Text>

            <View style={styles.dashedLineContainer}>
              {Array.from({ length: 6 }).map((_, index) => (
                <View key={index} style={styles.dash} />
              ))}
            </View>

            <View style={styles.profileSection}>
              <TouchableOpacity onPress={pickImage}>
                <Image
                  source={
                    imageUri
                      ? { uri: imageUri }
                      : require('../assets/user.png')
                  }
                  style={styles.avatar}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={pickImage}>
                <Text style={styles.editLabel}>
                  Edit <Feather name="edit" size={14} color="#fff" />
                </Text>
              </TouchableOpacity>
              <Text style={styles.username}>
                {userData.name || 'Your Name'}
              </Text>
            </View>

            <TouchableOpacity style={styles.button}>
              <Ionicons name="code-outline" size={20} color="black" />
              <Text style={styles.buttonText}>Change language</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
              <Ionicons name="time-outline" size={20} color="black" />
              <Text style={styles.buttonText}>Change Time</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
              <Ionicons name="information-circle-outline" size={20} color="black" />
              <Text style={styles.buttonText}>About</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
              <Entypo name="mail" size={20} color="black" />
              <Text style={styles.buttonText}>Contact Us</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.dangerButton]}>
              <Feather name="key" size={20} color="red" />
              <Text style={styles.dangerText}>Change password</Text>
            </TouchableOpacity>

            {/* Logout Button */}
            <TouchableOpacity
              style={[styles.button, styles.logoutButton]}
              onPress={handleLogout}
            >
              <AntDesign name="logout" size={20} color="#D80000" />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>

      <View style={styles.bottomBar}>
        <BottomNavigation />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0F4C38',
  },
  background: {
    flex: 1,
    width: '100%',
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 120,
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontFamily: 'Chewy_400Regular',
  },
  dashedLineContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 20,
    paddingBottom: 30,
  },
  dash: {
    width: 50,
    height: 1,
    backgroundColor: '#fff',
    marginHorizontal: 2,
    marginVertical: 1,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 5,
  },
  editLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '300',
    marginBottom: 4,
  },
  username: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'Chewy_400Regular',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '85%',
    backgroundColor: '#D9D9D9',
    padding: 16,
    borderRadius: 15,
    marginBottom: 12,
  },
  buttonText: {
    fontSize: 18,
    marginLeft: 12,
    color: '#000',
  },
  dangerButton: {
    backgroundColor: '#D9D9D9',
  },
  dangerText: {
    fontSize: 18,
    marginLeft: 12,
    color: 'red',
  },
  logoutButton: {
    backgroundColor: '#FFF5F5',
    borderColor: '#D80000',
    borderWidth: 1,
  },
  logoutText: {
    fontSize: 18,
    marginLeft: 12,
    color: '#D80000',
    fontWeight: 'bold',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#0F4C38',
    zIndex: 10,
  },
});
