import React, { createContext, useContext, useState } from 'react';

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [quizResults, setQuizResults] = useState([]);

  // Stats tracking state
  const [stats, setStats] = useState({
    totalQuestionsAnswered: 0,
    totalCorrect: 0,
    longestStreak: 0,
    currentStreak: 0,
  });

  // Function to update stats based on a new answer (boolean: isCorrect)
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

  // Optionally, reset stats function
  const resetStats = () => {
    setStats({
      totalQuestionsAnswered: 0,
      totalCorrect: 0,
      longestStreak: 0,
      currentStreak: 0,
    });
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
