import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../axios/axios";
import { message } from "antd";

const AuthContext = createContext(undefined);

export default function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState(() => localStorage.getItem("authToken"));
  const [currentUser, setCurrentUser] = useState(() => {
    const raw = localStorage.getItem("currentUser");
    return raw ? JSON.parse(raw) : null;
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        setIsLoading(true);
        const res = await axiosInstance.post("/auth/refresh", {});
        const { accessToken, user } = res.data;
        if (accessToken) {
          localStorage.setItem("authToken", accessToken);
          localStorage.setItem("currentUser", JSON.stringify(user));
          setAuthToken(accessToken);
          setCurrentUser(user);
        } else {
          localStorage.removeItem("authToken");
          localStorage.removeItem("currentUser");
          setAuthToken(null);
          setCurrentUser(null);
        }
      } catch (err) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("currentUser");
        setAuthToken(null);
        setCurrentUser(null);
      } finally {
        setIsLoading(false);
      }
    }
    init();
  }, []);

  async function handleLogin(creds) {
    try {
      setIsLoading(true);
      const res = await axiosInstance.post("/auth/login", creds);
      const { accessToken, user } = res.data;
      if (accessToken) {
        localStorage.setItem("authToken", accessToken);
        localStorage.setItem("currentUser", JSON.stringify(user));
        setAuthToken(accessToken);
        setCurrentUser(user);
        message.success("Login successful");
        return true;
      } else {
        throw new Error("Server Error");
      }
    } catch (err) {
      console.error("Login failed", err);
      message.error(err.response?.data?.message || "Login failed");
      localStorage.removeItem("authToken");
      localStorage.removeItem("currentUser");
      setAuthToken(null);
      setCurrentUser(null);
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  async function handleLogout() {
    try {
      setIsLoading(true);
      await axiosInstance.post("/auth/logout");
    } catch (err) {
      console.warn("Logout API failed", err);
    } finally {
      localStorage.removeItem("authToken");
      localStorage.removeItem("currentUser");
      setAuthToken(null);
      setCurrentUser(null);
      setIsLoading(false);
      message.success("Logged out");
    }
  }

  return (
    <AuthContext.Provider
      value={{
        authToken,
        currentUser,
        handleLogin,
        handleLogout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
