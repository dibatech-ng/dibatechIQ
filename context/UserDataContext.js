import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [quizResults, setQuizResults] = useState([]);
  const [stats, setStats] = useState({
    totalQuestionsAnswered: 0,
    totalCorrect: 0,
    longestStreak: 0,
    currentStreak: 0,
  });

  // ✅ Load saved data on first mount
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('userData');
        const savedQuizResults = await AsyncStorage.getItem('quizResults');
        const savedStats = await AsyncStorage.getItem('userStats');

        if (savedUser) setUserData(JSON.parse(savedUser));
        if (savedQuizResults) setQuizResults(JSON.parse(savedQuizResults));
        if (savedStats) setStats(JSON.parse(savedStats));
      } catch (error) {
        console.error('Error loading user data from storage:', error);
      }
    };

    loadUserData();
  }, []);

  // ✅ Save userData on change
  useEffect(() => {
    AsyncStorage.setItem('userData', JSON.stringify(userData));
  }, [userData]);

  // ✅ Save quizResults on change
  useEffect(() => {
    AsyncStorage.setItem('quizResults', JSON.stringify(quizResults));
  }, [quizResults]);

  // ✅ Save stats on change
  useEffect(() => {
    AsyncStorage.setItem('userStats', JSON.stringify(stats));
  }, [stats]);

  // Update stats after each question answered
  const updateStats = (isCorrect) => {
    setStats((prevStats) => {
      const newCurrentStreak = isCorrect ? prevStats.currentStreak + 1 : 0;
      const newLongestStreak = Math.max(prevStats.longestStreak, newCurrentStreak);
      const newTotalQuestionsAnswered = prevStats.totalQuestionsAnswered + 1;
      const newTotalCorrect = isCorrect ? prevStats.totalCorrect + 1 : prevStats.totalCorrect;

      return {
        totalQuestionsAnswered: newTotalQuestionsAnswered,
        totalCorrect: newTotalCorrect,
        longestStreak: newLongestStreak,
        currentStreak: newCurrentStreak,
      };
    });
  };

  const resetStats = () => {
    const reset = {
      totalQuestionsAnswered: 0,
      totalCorrect: 0,
      longestStreak: 0,
      currentStreak: 0,
    };
    setStats(reset);
    AsyncStorage.setItem('userStats', JSON.stringify(reset));
  };

  return (
    <UserDataContext.Provider
      value={{
        userData,
        setUserData,
        quizResults,
        setQuizResults,
        stats,
        updateStats,
        resetStats,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => useContext(UserDataContext);
