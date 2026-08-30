"use client";

import { createContext, useContext, ReactNode, useEffect, useSyncExternalStore } from "react";

export type User = {
  id: string;
  email: string;
  name: string;
};

type AuthContextValue = {
  user: User | null;
  login: (email: string, name?: string) => User;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "rikamchot:user";
const CHANGE_EVENT = "rikamchot-auth-change";

let cacheUser: User | null = null;

function readStorage(): { user: User | null; key: string | null } {
  if (typeof window === "undefined") return { user: null, key: null };
  try {
    const key = localStorage.getItem(STORAGE_KEY);
    if (key) return { user: JSON.parse(key) as User, key };
    return { user: null, key: null };
  } catch {
    return { user: null, key: null };
  }
}

function refreshCache() {
  const { user } = readStorage();
  cacheUser = user;
}

function generateId() {
  return Math.random().toString(36).slice(2, 10);
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const wrapped = () => {
    refreshCache();
    callback();
  };
  window.addEventListener("storage", wrapped);
  window.addEventListener(CHANGE_EVENT, wrapped);
  return () => {
    window.removeEventListener("storage", wrapped);
    window.removeEventListener(CHANGE_EVENT, wrapped);
  };
}

function getSnapshot() {
  return cacheUser;
}

function getServerSnapshot() {
  return cacheUser;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    refreshCache();
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  const user = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const login = (email: string, name?: string) => {
    const newUser: User = {
      id: generateId(),
      email,
      name: name || email.split("@")[0] || "Guest",
    };
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
      refreshCache();
      window.dispatchEvent(new Event(CHANGE_EVENT));
    }
    return newUser;
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
      cacheUser = null;
      window.dispatchEvent(new Event(CHANGE_EVENT));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
