import {
  AUTH_CLIENT_ID,
  AUTH_CLIENT_SECRET,
  AUTH_RESOURCE,
  AUTH_SCOPE,
  AUTH_SERVER_URL,
  HOST_URL,
} from "@/constants/config";
import { DASHBOARD, HOME } from "@/constants/routes";
import { useRouter } from "next/router";
import { AuthProvider as OidcAuthProvider } from "oidc-react";
import { ReactNode } from "react";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { push } = useRouter();

  return (
    <OidcAuthProvider
      authority={AUTH_SERVER_URL}
      clientId={AUTH_CLIENT_ID}
      clientSecret={AUTH_CLIENT_SECRET}
      autoSignIn={false}
      onSignIn={(user) => {
        if (!user) return;

        push(DASHBOARD);
      }}
      onSignOut={() => {
        push(HOME);
      }}
      redirectUri={HOST_URL}
      postLogoutRedirectUri={HOST_URL}
      responseType="code"
      loadUserInfo={false}
      scope={AUTH_SCOPE}
      extraQueryParams={{
        resource: AUTH_RESOURCE,
      }}
      location={
        typeof window === "undefined" ? ({} as Location) : window.location
      }
    >
      {children}
    </OidcAuthProvider>
  );
}
