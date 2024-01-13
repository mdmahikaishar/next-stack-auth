import axios, { AxiosResponse } from "axios";
import { IUser } from "../types";

const AUTH_URL = process.env.NEXT_PUBLIC_AUTH_URL as string;

async function authUser(token?: string) {
  return await axios.get<
    any,
    AxiosResponse<{
      user: IUser;
    }>
  >(AUTH_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export default {
  authUser,
};
