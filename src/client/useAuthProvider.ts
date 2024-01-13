"use client";
import { useState } from "react";
import jsCookie from "js-cookie";
import api from "../services/api";
import { IAuth, IAuthProvider } from "../types";

export default function useAuthProvider(props: IAuthProvider) {
  const [auth, setAuth] = useState<IAuth>(props.auth);

  const loadUser = async () => {
    const token = jsCookie.get("accessToken");

    try {
      const request = await api.authUser(token);
      if (!request.data.user) return;

      // authorized user
      setAuth({ user: request.data.user, status: "authorized" });
    } catch {
      return;
    }
  };

  const login = async (token: string) => {
    jsCookie.set("accessToken", token);
    await loadUser();
  };
  const logout = () => {
    jsCookie.set("accessToken", "");
    setAuth({ user: null, status: "unauthorized" });
  };

  return { auth, loadUser, login, logout };
}
