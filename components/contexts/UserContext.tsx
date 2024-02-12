"use client";
import { createContext, useContext, useEffect, useState } from "react";

interface User {
  name: string;
  email: string;
  id: string;
}

const useUserState = (initialUser: User | null) =>
  useState<User | null>(initialUser);

export const UserContext = createContext<ReturnType<
  typeof useUserState
> | null>(null);

export const useUser = () => {
  const user = useContext(UserContext);

  if (!user) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return user;
};

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useUserState(null);

  useEffect(() => {
    function fetchUser() {
      const user = localStorage.getItem("user");
      if (user) {
        setUser(JSON.parse(user));
      }
    }

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
