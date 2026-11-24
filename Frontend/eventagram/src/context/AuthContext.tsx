import { createContext, useContext, useState, type ReactNode } from "react";

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
    const response = await fetch(
      import.meta.env.VITE_API_BACKEND_URL + "/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      },
    );

    if (!response.ok) {
      throw new Error("Invalid Login Credentials");
    }

    const data = await response.json();

    if (!data.access_token || !data.user) {
      throw new Error("Missing token or user information");
    }

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
    const response = await fetch(
      import.meta.env.VITE_API_BACKEND_URL + "/auth/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      },
    );

    if (!response.ok) {
      throw new Error("Invalid Register Credentials");
    }
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
