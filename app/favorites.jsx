import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import BottomNavigation from '../components/BottomNavigation';
import { useUserData } from '../context/UserDataContext';
import { FontAwesome } from '@expo/vector-icons';

export default function FavouriteScreen() {
  const { quizResults, setQuizResults } = useUserData();

  const handleDelete = (indexToDelete) => {
    const filtered = quizResults.filter((_, i) => i !== indexToDelete);
    setQuizResults(filtered);
  };

  return (
    <SafeAreaView style={styles.screen}>
      {/* Main Content */}
      <ImageBackground
        source={require('../assets/bg2img.png')}
        style={styles.container}
        resizeMode="cover"
      >
        <Text style={styles.title}>Favourite</Text>

        {/* Dashed Divider */}
        <View style={styles.dashedLineContainer}>
          {Array.from({ length: 6 }).map((_, index) => (
            <View key={index} style={styles.dash} />
          ))}
        </View>

        {quizResults.length === 0 ? (
          <Text style={styles.description}>
            Add favourite quiz to always go back to and check out
          </Text>
        ) : (
          <ScrollView
            contentContainerStyle={styles.favList}
            showsVerticalScrollIndicator={false}
          >
            {quizResults.map((item, index) => {
              const correctKey = item.correct;
              const correctAnswer = item.options[correctKey];

              return (
                <View key={index} style={styles.favCard}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.questionText}>{item.question}</Text>
                    <TouchableOpacity onPress={() => handleDelete(index)}>
                      <FontAwesome name="trash" size={24} color="#FF6B6B" />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.answerContainer}>
                    <Text style={styles.answerLabel}>Correct Answer:</Text>
                    <Text style={styles.correctAnswerText}>
                      {correctKey}) {correctAnswer}
                    </Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        )}
      </ImageBackground>

      {/* Fixed Bottom Navigation */}
      <View style={styles.bottomBar}>
        <BottomNavigation />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0F4C38',
    position: 'relative',
  },
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 24,
    paddingBottom: 80,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    color: '#fff',
    fontFamily: 'Chewy_400Regular',
    marginBottom: 10,
  },
  dashedLineContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'center',
    marginVertical: 30,
  },
  dash: {
    width: 50,
    height: 1,
    backgroundColor: '#fff',
    marginHorizontal: 2,
    marginVertical: 1,
  },
  description: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'System',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: '#0F4C38',
  },
  favList: {
    width: '100%',
  },
  favCard: {
    width: 350,
    height: 180,
    backgroundColor: '#043120',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 6,
    justifyContent: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  questionText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    paddingRight: 10,
  },
  answerContainer: {
    backgroundColor: '#006633',
    padding: 15,
    borderRadius: 12,
  },
  answerLabel: {
    color: '#00FF80',
    fontWeight: 'bold',
    marginBottom: 6,
    fontSize: 14,
  },
  correctAnswerText: {
    color: '#fff',
    fontSize: 16,
  },
});
