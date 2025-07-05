// context/UserDataContext.js
import React, { createContext, useContext, useState } from 'react';

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    name: '',
    stack: '',
    level: '',
    quizTimes: {
      quiz1: '',
      quiz2: '',
      quiz3: '',
    },
  });

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => useContext(UserDataContext);
