import { useState, useEffect, createContext } from "react";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import superagent from "superagent";
import cookie from "react-cookies";
dotenv.config();
const API = "https://auth-server-401.herokuapp.com";
const SECRET = "supersecret";

export const AuthContext = createContext();

function AuthProvider(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    const token = cookie.load("auth");
    validateToken(token);
  }, []);

  const validateToken = (token) => {
    try {
      const user = jwt.verify(token, SECRET);
      setLoginState(true, token, user);
    } catch (e) {
      setLoginState(false, null, {});
    }
  };

  const setLoginState = (loggedIn, token, user) => {
    cookie.save("auth", token);
    setUser(user);
    setLoggedIn(loggedIn);
    setError(false);
  };

  const login = async (username, password) => {
    try {
      const response = await superagent
        .post(`${API}/signin`)
        .set("authorization", `Basic ${btoa(`${username}:${password}`)}`);
      validateToken(response.body.token);
    } catch (e) {
      console.error("Signin Error", error.message);
      setError(true);
    }
  };

  const signup = async (username, email, password, role) => {
    try {
      const response = await superagent.post(`${API}/signup`, {
        username,
        email,
        password,
        role,
      });
      validateToken(response.body.token);
    } catch (e) {
      console.error("Signup Error", error.message);
      setError(true);
    }
  };

  const logout = () => {
    setLoginState(false, null, {});
  };

  const state = { login, logout, signup, loggedIn, user, error, setError };

  return (
    <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>
  );
}

export default AuthProvider;
