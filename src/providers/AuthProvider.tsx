import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";
import axiosInstance from "../axios/axios";
import { message } from "antd";
// TODO Add user instead of record
type AuthContext = {
    authToken?: string | null;
    currentUser?: Object | null;
    handleLogin: (creds:{email:string,password:string}) => Promise<boolean>;
    handleLogout: () => void;
    isLoading: boolean;
}


const AuthContext = createContext<AuthContext | undefined>(undefined);

type AuthProvderTypes = PropsWithChildren

export default function AuthProvider({ children }: AuthProvderTypes) {
    const [authToken, setAuthToken] = useState<string | null>(() => localStorage.getItem("authToken"));
    const [currentUser, setCurrentUser] = useState(() => {
    const raw = localStorage.getItem("currentUser");
    return raw ? JSON.parse(raw) : null;
  });
    const [isLoading, setIsLoading] = useState<boolean>(true);

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
        // no refresh available — user not logged in
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

  
  async function handleLogin(creds: { email: string; password: string }): Promise<boolean> {
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
    } catch (err: any) {
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
      await axiosInstance.post("/auth/logout"); // backend will clear cookie & server store
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

    return <AuthContext.Provider
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
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}