import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import { Chewy_400Regular, useFonts } from '@expo-google-fonts/chewy';
import { useRouter } from 'expo-router';
import BottomNavigation from '../components/BottomNavigation';
import { useUserData } from '../context/UserDataContext';

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({ Chewy_400Regular });
  const router = useRouter();
  const { userData } = useUserData();

  if (!fontsLoaded) return null;

  return (
    <View style={styles.screen}>
      <ImageBackground
        source={require('../assets/bg2img.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.container}>
          {/* Profile Header */}
          <View style={styles.profileCard}>
            <View style={styles.profileRow}>
              <View style={styles.profileItem}>
                <Image
                  source={
                    userData.profileImage
                      ? { uri: userData.profileImage }
                      : require('../assets/user.png')
                  }
                  style={styles.profileImage}
                />
                <Text style={styles.username}>{userData.name || 'MAXNDREL'}</Text>
              </View>
              <View style={styles.profileItem}>
                <Text style={styles.topLabel}>XP</Text>
                <Text style={styles.value}>0</Text>
              </View>
              <View style={styles.profileItem}>
                <Text style={styles.topLabel}>🔥</Text>
                <Text style={styles.value}>3</Text>
              </View>
            </View>
          </View>

          {/* Quiz Card */}
          <ImageBackground
            source={require('../assets/stylebg.png')}
            imageStyle={{ borderRadius: 25, opacity: 0.6, marginLeft: 50 }}
            style={styles.quizCard}
          >
            <Text style={styles.quizTitle}>
              {(userData.stack?.toUpperCase() || 'STACK') +
                (userData.language
                  ? '-' +
                    userData.language.charAt(0).toUpperCase() +
                    userData.language.slice(1).toLowerCase()
                  : '')}
            </Text>
            <Text style={styles.level}>
              level: {userData.level || 'Not Set'}
            </Text>

            <View style={styles.quizRow}>
              <Text style={styles.quizLabel}>First quiz</Text>
              <View style={styles.timeBox}>
                <Text style={styles.timeText}>
                  {userData.quizTimes?.quiz1 || '--:--'}
                </Text>
              </View>
            </View>
            <View style={styles.quizRow}>
              <Text style={styles.quizLabel}>Second quiz</Text>
              <View style={styles.timeBox}>
                <Text style={styles.timeText}>
                  {userData.quizTimes?.quiz2 || '--:--'}
                </Text>
              </View>
            </View>
            <View style={styles.quizRow}>
              <Text style={styles.quizLabel}>Third quiz</Text>
              <View style={styles.timeBox}>
                <Text style={styles.timeText}>
                  {userData.quizTimes?.quiz3 || '--:--'}
                </Text>
              </View>
            </View>

            <View style={styles.starsRow}>
              <Text style={styles.star}>⭐</Text>
              <Text style={styles.star}>⭐</Text>
              <Text style={styles.star}>⭐</Text>
            </View>
          </ImageBackground>

          {/* Start Button */}
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => router.push('/countdown')}
          >
            <Text style={styles.startText}>Start</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>

      {/* Bottom Navigation */}
      <View style={styles.bottomBar}>
        <BottomNavigation />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#0C4A3A',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 100,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: '#0C4A3A',
  },
  profileCard: {
    backgroundColor: '#043120',
    width: '85%',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 40,
    marginTop: 40,
  },
  profileRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileItem: {
    flex: 1,
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 4,
  },
  username: {
    fontFamily: 'Chewy_400Regular',
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  topLabel: {
    fontFamily: 'Chewy_400Regular',
    fontSize: 36,
    color: '#fff',
    marginBottom: 2,
  },
  value: {
    fontFamily: 'Chewy_400Regular',
    fontSize: 24,
    color: '#fff',
  },
  quizCard: {
    backgroundColor: '#043120',
    width: '85%',
    height: 400,
    borderRadius: 25,
    padding: 20,
    marginBottom: 40,
    justifyContent: 'center',
  },
  quizTitle: {
    fontFamily: 'Chewy_400Regular',
    color: '#fff',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 5,
  },
  level: {
    fontFamily: 'Chewy_400Regular',
    color: '#fff',
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 20,
  },
  quizRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    alignItems: 'center',
  },
  quizLabel: {
    fontFamily: 'Chewy_400Regular',
    fontSize: 28,
    color: '#fff',
  },
  timeBox: {
    backgroundColor: '#2962FF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  timeText: {
    fontFamily: 'Chewy_400Regular',
    fontSize: 24,
    color: '#fff',
  },
  starsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  star: {
    fontSize: 30,
    marginHorizontal: 5,
  },
  startButton: {
    marginTop: 10,
    width: '85%',
    height: 80,
    backgroundColor: '#03BD03',
    borderRadius: 20,
    elevation: 3,
    justifyContent: 'center',
  },
  startText: {
    fontFamily: 'Chewy_400Regular',
    fontSize: 38,
    color: '#fff',
    textAlign: 'center',
  },
});
