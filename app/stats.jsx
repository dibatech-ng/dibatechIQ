import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import BottomNavigation from '../components/BottomNavigation';

const leaderboard = [
  { name: 'john', xp: 11034 },
  { name: 'MAXNDREL', xp: 12094, isTop: true },
  { name: 'Doe', xp: 10234 },
  { name: 'bella', xp: 832 },
  { name: 'jason', xp: 792 },
  { name: 'joe', xp: 628 },
  { name: 'joy', xp: 618 },
  { name: 'Grace', xp: 518 },
  { name: 'jake', xp: 418 },
  { name: 'jeff', xp: 318 },
];

export default function StatisticsScreen() {
  const top3 = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

  return (
    <View style={styles.screen}>
      <ImageBackground
        source={require('../assets/bg2img.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.safeArea}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.title}>Statistics</Text>

            {/* Dashed Divider */}
            <View style={styles.dashedLineContainer}>
              {Array.from({ length: 6 }).map((_, index) => (
                <View key={index} style={styles.dash} />
              ))}
            </View>

            {/* Stats Section */}
            <View style={styles.statsBox}>
              <Text style={styles.statsText}>Correct: 0%   Incorrect: 0%</Text>
              <Text style={styles.statLine}>Questions Answered      0</Text>
              <Text style={styles.statLine}>Total Correct           0</Text>
              <Text style={styles.statLine}>Longest Streak          0</Text>
              <Text style={styles.statLine}>Current Streak          0</Text>
            </View>

            {/* Leaderboard */}
            <View style={styles.leaderboardBox}>
              <View style={styles.leaderboardHeader}>
                <Text style={styles.leaderboardTitle}>Leaderboard</Text>
                <Text style={styles.leaderboardTitle}>Top 7</Text>
              </View>

              <View style={styles.topRow}>
                {top3.map((item, index) => (
                  <View
                    key={index}
                    style={[
                      styles.topCard,
                      item.isTop && styles.topCenterCard,
                    ]}
                  >
                    {item.isTop && <Text style={styles.crown}>👑</Text>}
                    <Image
                      source={require('../assets/user.png')}
                      style={styles.avatar}
                    />
                    <Text
                      style={[
                        styles.topName,
                        item.isTop && { color: '#FFD600' },
                      ]}
                    >
                      {item.name}
                    </Text>
                    <Text style={styles.topXP}>{item.xp} xp</Text>
                  </View>
                ))}
              </View>

              {rest.map((item, index) => (
                <View style={styles.userRow} key={index}>
                  <View style={styles.userInfo}>
                    <Image
                      source={require('../assets/user.png')}
                      style={styles.userIcon}
                    />
                    <Text style={styles.userName}>{item.name}</Text>
                  </View>
                  <Text style={styles.userXP}>{item.xp} xp</Text>
                </View>
              ))}
            </View>
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

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0F4C38',
    position: 'relative',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontFamily: 'Chewy_400Regular',
    marginTop: 20,
  },
  dashedLineContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
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
  statsBox: {
    backgroundColor: '#003122',
    width: '85%',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  statsText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statLine: {
    color: '#fff',
    fontSize: 16,
    marginVertical: 2,
  },
  leaderboardBox: {
    backgroundColor: '#003122',
    width: '85%',
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
  },
  leaderboardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  leaderboardTitle: {
    color: '#fff',
    fontFamily: 'Chewy_400Regular',
    fontSize: 18,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  topCard: {
    backgroundColor: '#1E40AF',
    width: width * 0.23,
    borderRadius: 15,
    alignItems: 'center',
    padding: 10,
  },
  topCenterCard: {
    transform: [{ scale: 1.1 }],
    shadowColor: '#FFD600',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  crown: {
    fontSize: 24,
    position: 'absolute',
    top: -12,
  },
  avatar: {
    width: 40,
    height: 40,
    marginBottom: 4,
  },
  topName: {
    color: '#fff',
    fontFamily: 'Chewy_400Regular',
    fontSize: 14,
  },
  topXP: {
    color: '#fff',
    fontSize: 12,
  },
  userRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  userName: {
    color: '#fff',
    fontFamily: 'Chewy_400Regular',
    fontSize: 16,
  },
  userXP: {
    color: '#fff',
    fontSize: 16,
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    backgroundColor: '#0F4C38',
  },
});
