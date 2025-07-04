import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import BottomNavigation from '../components/BottomNavigation';
import { Ionicons, MaterialIcons, Entypo, Feather } from '@expo/vector-icons';

export default function SettingsScreen() {
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

            {/* Dashed Divider */}
            <View style={styles.dashedLineContainer}>
              {Array.from({ length: 6 }).map((_, index) => (
                <View key={index} style={styles.dash} />
              ))}
            </View>

            {/* Profile Section */}
            <View style={styles.profileSection}>
              <Image
                source={require('../assets/user.png')}
                style={styles.avatar}
              />
              <Text style={styles.editLabel}>
                Edit <Feather name="edit" size={14} color="#fff" />
              </Text>
              <Text style={styles.username}>MAXNDREL</Text>
            </View>

            {/* Buttons */}
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
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>

      {/* Fixed Bottom Navigation */}
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
    paddingTop: 20,
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
    marginBottom: 30,
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
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#0F4C38',
    zIndex: 10,
  },
});
