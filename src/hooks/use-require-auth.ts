import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LOGIN } from "../constants/routes";
import useAuth from "./use-auth";

export function useRequireAuth(redirectUrl = LOGIN) {
  const [isRendered, setIsRendered] = useState(false);
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    setIsRendered(true);
    return () => setIsRendered(false);
  }, []);

  useEffect(() => {
    if (isRendered && !auth.isLoggingIn && !auth.user) {
      router.push(redirectUrl);
    }
  }, [auth, isRendered, redirectUrl, router]);

  return auth;
}
