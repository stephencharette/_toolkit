import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  const updateUser = (newUserId) => {
    localStorage.setItem("userId", newUserId);
    setUserId(newUserId);
  };

  const removeUser = () => {
    localStorage.removeItem("userId");
    setUserId(null);
  };

  return (
    <UserContext.Provider value={{ userId, updateUser, removeUser }}>
      {children}
    </UserContext.Provider>
  );
};
