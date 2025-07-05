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

export default function QuestionScreen() {
  const [timer, setTimer] = useState(10);
  const [favorited, setFavorited] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const toastAnim = useState(new Animated.Value(0))[0];

  const [selectedOption, setSelectedOption] = useState(null);
  const correctOption = 'C';

  useEffect(() => {
    if (timer > 0) {
      const interval = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(interval);
    } else {
      console.log("Time's up!");
    }
  }, [timer]);

  const handleFavorite = () => {
    const newStatus = !favorited;
    setFavorited(newStatus);
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
    if (selectedOption) return;
    setSelectedOption(option);
  };

  const getOptionStyle = (option) => {
    if (!selectedOption) return styles.option;
    if (option === correctOption && selectedOption === correctOption)
      return [styles.option, styles.correctOption];
    if (option === selectedOption && selectedOption !== correctOption)
      return [styles.option, styles.wrongOption];
    if (option === correctOption && selectedOption !== correctOption)
      return [styles.option, styles.correctOption];
    return styles.option;
  };

  const isCorrect = selectedOption === correctOption;

  return (
    <ImageBackground
      source={require('../assets/bg2img.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Header */}
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

        {/* Toast Notification */}
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

        {/* Question */}
        <View style={styles.questionBox}>
          <Text style={styles.questionText}>
            What is the correct HTML{'\n'}
            element for inserting a line{'\n'}
            break?
          </Text>
        </View>

        {/* Options */}
        <TouchableOpacity
          style={getOptionStyle('A')}
          onPress={() => handleOptionPress('A')}
        >
          <Text style={styles.optionText}>A) &lt;break&gt;</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={getOptionStyle('B')}
          onPress={() => handleOptionPress('B')}
        >
          <Text style={styles.optionText}>B) &lt;lb&gt;</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={getOptionStyle('C')}
          onPress={() => handleOptionPress('C')}
        >
          <Text style={styles.optionText}>C) &lt;br&gt;</Text>
        </TouchableOpacity>

        {/* Action Button */}
        {selectedOption && (
          <TouchableOpacity
            style={[
              styles.actionButton,
              isCorrect ? styles.correctButton : styles.wrongButton,
            ]}
            onPress={() => {
              if (isCorrect) {
                console.log('Proceed to next question');
              } else {
                console.log('Explain correct answer');
              }
            }}
          >
            <Text style={styles.actionText}>
              {isCorrect ? 'Continue' : 'Check Correct Answer'}
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
    padding: 24,
    borderRadius: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 8,
    elevation: 8,
  },
  questionText: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Chewy_400Regular',
    textAlign: 'center',
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
    fontFamily: 'Chewy_400Regular',
  },
  actionButton: {
    marginTop: 30,
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 20,
    elevation: 5,
  },
  correctButton: {
    backgroundColor: '#00C853',
  },
  wrongButton: {
    backgroundColor: '#D32F2F',
  },
  actionText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
});
