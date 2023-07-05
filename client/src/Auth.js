import React, { useContext, useState } from "react";
import { auth, googleProvider } from "./config/auth";
import { signInWithPopup, signOut } from "firebase/auth";
import { UserContext } from "./contexts/UserContext";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import axios from "./config/axios";

export const Auth = () => {
  const { updateUser, removeUser } = useContext(UserContext);
  const { userId, userAvatar, userDisplayName, userEmail } =
    useContext(UserContext);

  const signInWithGoogle = async () => {
    try {
      let response = await signInWithPopup(auth, googleProvider);
      const [userId, idToken] = await Promise.all([
        response.user.uid,
        response.user.getIdToken(),
      ]);
      const authToken = `Bearer ${idToken}`;
      const result = await axios({
        method: "post",
        url: `/api/login`,
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: authToken,
        },
      });
      if (result.status !== 200 || userId != result.data.userId) return;

      updateUser(response.user, authToken);
    } catch (err) {
      console.error(err);
    }
  };
  const logOut = async () => {
    try {
      await signOut(auth);
      removeUser();
    } catch (err) {
      console.error(err);
    }
  };

  if (userId) {
    return (
      <div className="flex items-center space-x-2">
        <img
          src={userAvatar}
          referrerPolicy="no-referrer"
          id="avatarButton"
          type="button"
          className="w-10 h-10 mx-auto rounded-full"
          alt="User profile picture"
        ></img>
        <div className="flex items-center flex-col space-y-1">
          <p
            onClick={logOut}
            className="dark:text-white text-left text-gray-800"
          >
            {userDisplayName}
          </p>
          {/* <div className="ml-auto btn-sm w-14">Sign out</div> */}
        </div>
      </div>
    );
  } else {
    return (
      <button onClick={signInWithGoogle} type="button" className="auth-btn">
        <div className="flex items-center space-x-2 mx-auto">
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="google"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
          >
            <path
              fill="currentColor"
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            ></path>
          </svg>
          <p>Sign in with Google</p>
        </div>
      </button>
    );
  }
};
