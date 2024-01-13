"use client";
import React, { createContext, useContext } from "react";
import useAuthProvider from "./useAuthProvider";
import { IAuthContext, IAuthProvider } from "../types";

const AuthContext = createContext({} as IAuthContext);

export function AuthProvider(props: IAuthProvider) {
  const { auth, loadUser, login, logout } = useAuthProvider(props);

  return (
    <AuthContext.Provider value={{ ...auth, loadUser, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
