import { createContext, useContext, useState, type ReactNode } from "react";
import { loginUser, registerUser } from "../api/auth";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  user: User | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    return sessionStorage.getItem("token");
  });

  const [user, setUser] = useState<User | null>(() => {
    const savedUser = sessionStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  async function login(email: string, password: string): Promise<void> {
    const data = await loginUser(email, password);

    sessionStorage.setItem("token", data.access_token);
    setToken(data.access_token);

    sessionStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
  }

  async function register(
    name: string,
    email: string,
    password: string,
  ): Promise<void> {
    await registerUser(name, email, password);
  }

  function logout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
