import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import shouldRedirect from "./utlis/shouldRedirect";
import api from "./services/api";

export default async function authOnSSR() {
  const token = cookies().get("accessToken")?.value;
  const needRedirect = shouldRedirect("");

  // don't have a token
  if (!token && needRedirect.should) {
    redirect(needRedirect.path);
  }

  // have a token
  try {
    const request = await api.authUser(token);
    if (!request.data.user && needRedirect.should) {
      redirect(needRedirect.path);
    }
  } catch (error) {
    if (!needRedirect.should) return;
    redirect(needRedirect.path);
  }
}
