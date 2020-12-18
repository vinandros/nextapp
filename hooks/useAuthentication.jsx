import React, { useEffect, useState } from "react";
import firebase from "../firebase";

function useAuthentication() {
  const [authenticadedUser, setAuthenticadedUser] = useState(null);

  useEffect(() => {
    const unsuscribe = firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthenticadedUser(user);
      } else {
        setAuthenticadedUser(null);
      }
    });
    return () => unsuscribe();
  }, []);

  return authenticadedUser;
}

export default useAuthentication;
