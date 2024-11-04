import axios from "axios";
import { UserInterface } from "@/interfaces/UserInterface";
import { createContext, useContext, useEffect, useState } from "react";
import { useGetData, usePostData } from "@/hooks/apiService";

interface AuthContextType {
  user: UserInterface | null;
  message: string;
  isLoading: boolean;
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => void;
  handleRegister: (e: React.FormEvent<HTMLFormElement>) => void;
  handleLogout: () => void;
  clearMessage: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    console.error("context not found");
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function authme() {
    setIsLoading(true);
    try {
      const result = await useGetData("/auth/authme");
      setUser(result.data);
    } catch (error: any) {
      console.error(error.response);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    authme();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      message && setMessage("");
    }, 8000);
  }, [message]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    const data = JSON.stringify({
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    });

    try {
      const result = await usePostData("/auth/login", data);
      localStorage.setItem("token", result.data.token);
      setUser(result.data.user);
      window.location.href = "/";
    } catch (error: any) {
      console.error(error.response);
      if (error.response) {
        setMessage(error.response.data.message);
      } else if (error.request) {
        setMessage("No response from server");
      } else {
        setMessage(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    const data = JSON.stringify({
      name: e.currentTarget.username.value,
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    });

    try {
      await usePostData("/auth/register", data);
      window.location.href = "/auth/login";
    } catch (error: any) {
      setMessage(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await usePostData("/auth/logout", {});
      setUser(null);
      localStorage.removeItem("token");
    } catch (error: any) {
      setMessage(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessage = () => {
    setMessage("");
  };

  const contextValue = {
    user,
    handleLogin,
    handleRegister,
    handleLogout,
    message,
    isLoading,
    clearMessage,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
