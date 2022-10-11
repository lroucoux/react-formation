import React, { useState, useEffect, useCallback } from "react";

let logoutTimer: NodeJS.Timeout;

type AuthContextObj = {
  token: string | null | undefined;
  isLoggedIn: boolean;
  login: (token: string, expirationTime: string) => void;
  logout: () => void;
};

const AuthContext = React.createContext<AuthContextObj>({
  token: "",
  isLoggedIn: false,
  login: (token: string) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime: string) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  return adjExpirationTime - currentTime;
};

const retreiveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime");

  const remainingTime = calculateRemainingTime(
    storedExpirationDate || new Date().toISOString()
  );

  if (remainingTime <= 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

export const AuthContextProvider: React.FC<React.PropsWithChildren> = (
  props
) => {
  const tokenData = retreiveStoredToken();
  const initialToken = tokenData?.token;
  const [token, setToken] = useState(initialToken);

  // Si token est vide, retourne false. Sinon, retourne true
  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token: string, expirationTime: string) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      console.log(tokenData.duration);
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
