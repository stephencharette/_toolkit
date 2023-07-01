import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

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
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const getSettings = async () => {
      try {
        const result = await axios({
          method: "get",
          url: `/settings/${userId}`,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            Authorization: authToken,
          },
        });

        if (result.status !== 200) return;

        setSettings(result.data.settings);
      } catch (error) {
        // TODO: handle error...
      }
    };
    getSettings();
  }, []);

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
        settings,
        setSettings,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
