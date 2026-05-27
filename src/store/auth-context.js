import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const expiration = localStorage.getItem("expiration");
  const expirationTime = new Date(expiration);
  const currentTime = new Date();
  if (currentTime > expirationTime) {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }
  
  const initialToken = localStorage.getItem("token");

  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };
  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    const expirationTime = new Date(new Date().getTime() + 5 * 60 * 1000);
    localStorage.setItem("expiration", expirationTime.toISOString());
  };

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
