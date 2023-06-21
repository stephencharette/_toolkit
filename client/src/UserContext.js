import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [userAvatar, setUserAvatar] = useState(
    localStorage.getItem("userAvatar")
  );
  const [userDisplayName, setUserDisplayName] = useState(
    localStorage.getItem("userDisplayName")
  );
  const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail"));
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));

  const updateUser = (user, token) => {
    localStorage.setItem("userId", user.uid);
    setUserId(user.uid);

    localStorage.setItem("userAvatar", user.photoURL);
    setUserAvatar(user.photoURL);

    localStorage.setItem("userDisplayName", user.displayName);
    setUserDisplayName(user.displayName);

    localStorage.setItem("userEmail", user.email);
    setUserEmail(user.email);

    localStorage.setItem("authToken", token);
    setAuthToken(token);
  };

  const removeUser = () => {
    localStorage.removeItem("userId");
    setUserId(null);
    localStorage.removeItem("userAvatar");
    setUserAvatar(null);
    localStorage.removeItem("userDisplayName");
    setUserDisplayName(null);
    localStorage.removeItem("userEmail");
    setUserEmail(null);
    localStorage.removeItem("authToken");
    setAuthToken(null);
  };

  return (
    <UserContext.Provider
      value={{
        userId,
        userAvatar,
        userDisplayName,
        userEmail,
        updateUser,
        removeUser,
        authToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
