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
    setIsLoading(true);
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:8000/api/auth/authme", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data.data);
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
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

    const data = JSON.stringify({
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    });

    axios
      .post("http://localhost:8000/api/auth/login", data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res: any) => {
        localStorage.setItem("token", res.data.data.token);
        window.location.href = "/";
      })
      .catch((error) => {
        if (error.res) {
          setMessage(error.res.data.message);
        } else if (error.res.data.message === 500) {
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

    const token = localStorage.getItem("token");

    const data = JSON.stringify({
      name: e.currentTarget.username.value,
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    });

    axios
      .post("http://localhost:8000/api/auth/register", data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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
    setIsLoading(true);
    const token = localStorage.getItem("token");

    axios
      .post(
        "http://localhost:8000/api/auth/logout",
        {},
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setUser(null);
      })
      .finally(() => setIsLoading(false));
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
