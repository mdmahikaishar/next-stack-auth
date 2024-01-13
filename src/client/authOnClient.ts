"use client";
import { usePathname, useRouter } from "next/navigation";
import shouldRedirect from "../utlis/shouldRedirect";
import { useAuth } from "./AuthContext";

export default function authOnClient(): void {
  const router = useRouter();
  const auth = useAuth();
  const needRedirect = shouldRedirect(usePathname() || "");

  if (!auth.user) {
    if (!needRedirect.should) return;
    router.push(needRedirect.path);
  }
}
