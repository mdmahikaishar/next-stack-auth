import { ReactNode } from "react";

export interface IUser {
  id: string | number;
  name: string;
  img: string;
  [key: string]: any;
}

export interface IAuth {
  user: IUser | null;
  status: "authorized" | "unauthorized";
}

export interface IAuthContext extends IAuth {
  loadUser: () => Promise<void>;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

export interface IAuthProvider {
  auth: TAuthData;
  children: ReactNode;
}

export type TAuthData =
  | {
      user: IUser;
      status: "authorized";
    }
  | { user: null; status: "unauthorized" };

