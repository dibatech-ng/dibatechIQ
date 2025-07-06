import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useStats } from '../context/StatsContext';

export default function SummaryScreen() {
  const router = useRouter();
  const { score, total } = useLocalSearchParams();
  const correct = parseInt(score) || 0;
  const totalQuestions = parseInt(total) || 1;
  const incorrect = totalQuestions - correct;
  const correctPercent = Math.round((correct / totalQuestions) * 100);
  const incorrectPercent = 100 - correctPercent;

  const { updateStats } = useStats();

  useEffect(() => {
    // Update global stats once when this screen loads
    for (let i = 0; i < totalQuestions; i++) {
      const isCorrect = i < correct; // first 'correct' are true, rest false
      updateStats(isCorrect);
    }
  }, []);

  return (
    <ImageBackground
      source={require('../assets/bg2img.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Summary</Text>

        {/* Dashed Divider */}
        <View style={styles.dashedLineContainer}>
          {Array.from({ length: 6 }).map((_, index) => (
            <View key={index} style={styles.dash} />
          ))}
        </View>

        <View style={styles.quoteBox}>
          <Text style={styles.quote}>
            {"Failure isn't the opposite of success"}{'\n'}
            {"it's part of success"}
          </Text>
        </View>

        <View style={styles.scoreBox}>
          <View style={styles.scoreRow}>
            <Text style={styles.scoreLabel}>Correct: {correctPercent}%</Text>
            <Text style={styles.scoreLabel}>Incorrect: {incorrectPercent}%</Text>
          </View>

          <View style={styles.statRow}>
            <Text style={styles.statText}>Questions Answered</Text>
            <Text style={styles.statValue}>{totalQuestions}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statText}>Total Correct</Text>
            <Text style={styles.statValue}>{correct}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statText}>Total Incorrect</Text>
            <Text style={styles.statValue}>{incorrect}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => router.push('/home')}
        >
          <Text style={styles.continueText}>CONTINUE</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingTop: 90,
    paddingBottom: 100,
    paddingHorizontal: 20,
    alignItems: 'center',
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
    marginVertical: 15,
  },
  quoteBox: {
    backgroundColor: '#003322',
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
    width: '100%',
    height: 130,
    justifyContent: 'center',
  },
  quote: {
    color: '#fff',
    fontSize: 22,
    textAlign: 'center',
    fontFamily: 'Chewy_400Regular',
  },
  scoreBox: {
    backgroundColor: '#002d20',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    height: 350,
    marginBottom: 30,
    justifyContent: 'center',
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  scoreLabel: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  statText: {
    color: '#fff',
    fontSize: 18,
    paddingVertical: 20,
  },
  statValue: {
    color: '#fff',
    fontSize: 18,
    paddingVertical: 20,
  },
  continueButton: {
    backgroundColor: '#002d20',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 60,
    elevation: 6,
  },
  continueText: {
    color: '#d9d9d9',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
