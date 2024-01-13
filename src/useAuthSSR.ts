import { cookies } from "next/headers";
import { TAuthData } from "./types";
import api from "./services/api";

export default async function useAuthSSR(): Promise<TAuthData> {
  const token = cookies().get("accessToken")?.value;

  // don't have a token
  if (!token) {
    return { user: null, status: "unauthorized" };
  }

  try {
    const request = await api.authUser(token);
    if (!request.data.user) {
      return { user: null, status: "unauthorized" };
    }
    return { user: request.data.user, status: "authorized" };
  } catch (error) {
    return { user: null, status: "unauthorized" };
  }
}
