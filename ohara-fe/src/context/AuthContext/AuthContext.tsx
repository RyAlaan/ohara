import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserInterface } from "../../interfaces/UserInterface";

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

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/auth/me", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.statusCode === 200) {
          setUser(response.data.data);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    setTimeout(() => {
      message && setMessage("");
    }, 8000);
  }, [message]);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    const data = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };

    axios
      .post("http://localhost:3000/api/auth/login", data, {
        withCredentials: true,
      })
      .then(() => {
        window.location.href = "/";
      })
      .catch((error) => {
        console.error(error);
        if (error.response) {
          setMessage(error.response.data.message);
        } else if (error.request) {
          setMessage("No response from server");
        } else {
          setMessage(error.message);
        }
      })
      .finally(() => setIsLoading(false));
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    const data = {
      name: e.currentTarget.username.value,
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };

    axios
      .post("http://localhost:3000/api/auth/register", data, {
        withCredentials: true,
      })
      .then(() => {
        window.location.href = "/auth/login";
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data.message);
          setMessage(error.response.data.message);
        }
      })
      .finally(() => setIsLoading(false));
  };

  const handleLogout = () => {
    axios
      .post(
        "http://localhost:3000/api/auth/logout",
        {},
        { withCredentials: true }
      )
      .then(() => {
        setUser(null)
      });
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
