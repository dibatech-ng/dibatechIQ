import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFonts as useChewy, Chewy_400Regular } from '@expo-google-fonts/chewy';
import { useRouter } from 'expo-router';
import { useUserData } from '../context/UserDataContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function QuizTimeScreen() {
  const [fontsLoaded] = useChewy({ Chewy_400Regular });
  const router = useRouter();
  const { userData, setUserData } = useUserData();

  const [time1, setTime1] = useState(new Date(2023, 1, 1, 8, 30));
  const [time2, setTime2] = useState(new Date(2023, 1, 1, 13, 30));
  const [time3, setTime3] = useState(new Date(2023, 1, 1, 18, 0));

  const [pickerVisible, setPickerVisible] = useState(false);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState(null);

  if (!fontsLoaded) return null;

  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = ((hours + 11) % 12 + 1).toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const handleChange = (event, selectedDate) => {
    if (selectedDate) {
      const update = (index, value) => {
        if (index === 1) setTime1(value);
        else if (index === 2) setTime2(value);
        else if (index === 3) setTime3(value);
      };
      update(selectedTimeIndex, selectedDate);
    }
    if (Platform.OS === 'ios') {
      setPickerVisible(false);
    }
  };

  const showPicker = (index) => {
    setSelectedTimeIndex(index);
    if (Platform.OS === 'ios') {
      setPickerVisible(true);
    }
  };

  const getCurrentTimeValue = () => {
    if (selectedTimeIndex === 1) return time1;
    if (selectedTimeIndex === 2) return time2;
    return time3;
  };

  const handleGo = async () => {
    const quizTimes = {
      quiz1: formatTime(time1),
      quiz2: formatTime(time2),
      quiz3: formatTime(time3),
    };

    setUserData({
      ...userData,
      quizTimes,
    });

    try {
      await AsyncStorage.setItem('@user_quizTimes', JSON.stringify(quizTimes));
    } catch (err) {
      console.warn('Failed to save quiz times:', err);
    }

    router.push('/welcome');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Select quiz time</Text>
      <Text style={styles.subtitle}>Don’t worry, you can always edit this in the settings</Text>

      <TouchableOpacity
        style={[styles.card, { backgroundColor: '#FFD600' }]}
        onPress={() => showPicker(1)}
      >
        <Text style={styles.cardLabel}>Quiz time 1</Text>
        <Text style={styles.cardTime}>{formatTime(time1)}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.card, { backgroundColor: '#FF3D3D' }]}
        onPress={() => showPicker(2)}
      >
        <Text style={styles.cardLabel}>Quiz time 2</Text>
        <Text style={styles.cardTime}>{formatTime(time2)}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.card, { backgroundColor: '#2962FF' }]}
        onPress={() => showPicker(3)}
      >
        <Text style={styles.cardLabel}>Quiz time 3</Text>
        <Text style={styles.cardTime}>{formatTime(time3)}</Text>
      </TouchableOpacity>

      {Platform.OS === 'ios' && pickerVisible && (
        <Modal transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.pickerWrapper}>
              <DateTimePicker
                mode="time"
                display="spinner"
                value={getCurrentTimeValue()}
                onChange={handleChange}
              />
              <TouchableOpacity
                onPress={() => setPickerVisible(false)}
                style={styles.doneButton}
              >
                <Text style={styles.doneText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      <TouchableOpacity style={styles.goButton} onPress={handleGo}>
        <LinearGradient
          colors={['#C6F68D', '#74DBEF']}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.goButtonText}>LET’S GO</Text>
        </LinearGradient>
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
    paddingTop: 80,
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontFamily: 'Chewy_400Regular',
    marginBottom: 8,
  },
  subtitle: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Chewy_400Regular',
    marginBottom: 30,
  },
  card: {
    width: '85%',
    borderRadius: 24,
    padding: 20,
    marginVertical: 10,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  cardLabel: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Chewy_400Regular',
  },
  cardTime: {
    fontSize: 30,
    fontFamily: 'Chewy_400Regular',
    color: '#fff',
    marginTop: 5,
    textAlign: 'center',
  },
  goButton: {
    marginTop: 40,
    borderRadius: 16,
    overflow: 'hidden',
  },
  gradient: {
    paddingVertical: 16,
    paddingHorizontal: 50,
    borderRadius: 16,
  },
  goButtonText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Chewy_400Regular',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pickerWrapper: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  doneButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  doneText: {
    fontSize: 16,
    color: '#0C4A3A',
    fontWeight: '600',
  },
});
