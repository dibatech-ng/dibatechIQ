import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Animated,
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useUserData } from '../context/UserDataContext';
import { questionMap } from '../questionMap';
import { useRouter } from 'expo-router';

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function QuestionScreen() {
  const router = useRouter();
  const { userData, updateStats, quizResults, setQuizResults } = useUserData();
  const stack = userData.stack?.toLowerCase();
  const language = userData.language?.toLowerCase();
  const allQuestions = questionMap[stack]?.[language] || [];

  const [questions, setQuestions] = useState([]);
  const [timer, setTimer] = useState(10);
  const [favorited, setFavorited] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const toastAnim = useState(new Animated.Value(0))[0];

  const [selectedOption, setSelectedOption] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const picked = shuffleArray(allQuestions).slice(0, 5); // pick 5 random
    setQuestions(picked);
  }, []);

  const currentQuestion = questions[currentIndex];
  const correctOption = currentQuestion?.correct;
  const isCorrect = selectedOption === correctOption;

  useEffect(() => {
    if (timer > 0 && !selectedOption) {
      const interval = setTimeout(() => setTimer((t) => t - 1), 1000);
      return () => clearTimeout(interval);
    }
  }, [timer, selectedOption]);

  const handleFavorite = () => {
    const newStatus = !favorited;
    setFavorited(newStatus);

    if (newStatus) {
      // Save current question + answer to favorites in context
      const favEntry = {
        question: currentQuestion.question,
        options: currentQuestion.options,
        correct: currentQuestion.correct,
        // Optionally, save user's selected option if any:
        selected: selectedOption,
      };

      // Avoid duplicate favorites by question text:
      if (!quizResults.some((q) => q.question === favEntry.question)) {
        setQuizResults([...quizResults, favEntry]);
      }
    } else {
      // Remove from favorites by question text:
      setQuizResults(quizResults.filter((q) => q.question !== currentQuestion.question));
    }

    setToastMessage(newStatus ? 'Added to favourites' : 'Removed from favourites');
    setShowToast(true);

    Animated.timing(toastAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(toastAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => setShowToast(false));
      }, 1200);
    });
  };

  const handleOptionPress = (option) => {
    if (!selectedOption) {
      setSelectedOption(option);
    }
  };

  const handleNext = () => {
    const newAnswer = {
      question: currentQuestion.question,
      selected: selectedOption,
      correct: correctOption,
      isCorrect,
    };

    setAnswers((prev) => [...prev, newAnswer]);
    updateStats(isCorrect); // Update global stats here
    setCurrentIndex((prev) => prev + 1);
    setSelectedOption(null);
    setTimer(10);
    setFavorited(false); // reset favorite for next question
  };

  const handleShowSummary = () => {
    const finalAnswer = {
      question: currentQuestion.question,
      selected: selectedOption,
      correct: correctOption,
      isCorrect,
    };
    const finalAnswers = [...answers, finalAnswer];

    updateStats(isCorrect); // Update stats for the last answer

    const correctCount = finalAnswers.filter((a) => a.isCorrect).length;

    router.push({
      pathname: '/summary',
      params: {
        score: correctCount,
        total: finalAnswers.length,
      },
    });
  };

  const getOptionStyle = (option) => {
    if (!selectedOption) return styles.option;
    if (option === correctOption) return [styles.option, styles.correctOption];
    if (option === selectedOption && option !== correctOption)
      return [styles.option, styles.wrongOption];
    return styles.option;
  };

  if (questions.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'white', marginTop: 100 }}>
          No questions found for: {userData.stack}-{userData.language}
        </Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../assets/bg2img.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.timerBox}>
            <Ionicons name="time-outline" size={24} color="#fff" />
            <Text style={styles.timerText}>{timer}</Text>
          </View>
          <TouchableOpacity style={styles.heartIcon} onPress={handleFavorite}>
            <FontAwesome
              name={favorited ? 'heart' : 'heart-o'}
              size={24}
              color={favorited ? '#00FF80' : '#fff'}
            />
          </TouchableOpacity>
        </View>

        {showToast && (
          <Animated.View
            style={[
              styles.toast,
              {
                opacity: toastAnim,
                transform: [
                  {
                    translateY: toastAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <Text style={styles.toastText}>{toastMessage}</Text>
          </Animated.View>
        )}

        <View style={styles.questionBox}>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
        </View>

        {Object.entries(currentQuestion.options).map(([key, value]) => (
          <TouchableOpacity
            key={key}
            style={getOptionStyle(key)}
            onPress={() => handleOptionPress(key)}
            disabled={!!selectedOption}
          >
            <Text style={styles.optionText}>
              {key}) {value}
            </Text>
          </TouchableOpacity>
        ))}

        {selectedOption && (
          <TouchableOpacity
            style={[styles.actionButton, styles.nextButton]}
            onPress={
              currentIndex + 1 < questions.length ? handleNext : handleShowSummary
            }
          >
            <Text style={styles.actionText}>
              {currentIndex + 1 < questions.length ? 'Next Question' : 'See Summary'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#0C4A3A',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  container: {
    flex: 1,
    width: '100%',
    paddingTop: 60,
    alignItems: 'center',
  },
  header: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  timerBox: {
    backgroundColor: '#093828',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 15,
  },
  timerText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  heartIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#093828',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toast: {
    position: 'absolute',
    top: 40,
    backgroundColor: '#00FF80',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    zIndex: 20,
  },
  toastText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  questionBox: {
    backgroundColor: '#0D3628',
    width: '90%',
    height: 300,
    borderRadius: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 8,
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  option: {
    backgroundColor: '#0D3628',
    width: '90%',
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 6,
  },
  correctOption: {
    backgroundColor: '#00C853',
  },
  wrongOption: {
    backgroundColor: '#D32F2F',
  },
  optionText: {
    color: '#fff',
    fontSize: 20,
  },
  actionButton: {
    marginTop: 20,
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 20,
    elevation: 5,
  },
  nextButton: {
    backgroundColor: '#03BD03',
  },
  actionText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
});
