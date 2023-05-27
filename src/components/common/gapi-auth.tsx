import { GOOGLE_API_KEY, GOOGLE_CLIENT_ID } from "@/constants/config";
import { useToast } from "@chakra-ui/react";
import Script from "next/script";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

const DISCOVERY_DOC =
  "https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest";
const SCOPES = "https://www.googleapis.com/auth/gmail.readonly";

type GapiContextType = {
  isAuthorised: boolean;
  requestAuth: (opts: { onAuth: () => void }) => void;
};

const GapiContext = createContext<GapiContextType>({
  isAuthorised: false,
  requestAuth: () => {},
});

export function GapiWrapper({ children }: { children: ReactNode }) {
  const [tokenClient, setTokenClient] =
    useState<google.accounts.oauth2.TokenClient>();
  const [isAuthorised, setIsAuthorised] = useState(false);
  const toast = useToast();

  const onGapiLoaded = useCallback(() => {
    gapi.load("client", async () => {
      await gapi.client.init({
        apiKey: GOOGLE_API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
      });
    });
  }, []);

  const onGisLoaded = useCallback(() => {
    const newTokenClient = google.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_CLIENT_ID,
      scope: SCOPES,
      callback: () => {}, // Set later in useGapiAuth
    });
    setTokenClient(newTokenClient);
  }, []);

  const requestAuth = useCallback(
    ({ onAuth }: { onAuth: () => void }) => {
      console.log("Requesting authorisation");
      if (!tokenClient) {
        toast({
          title: "Error requesting authorisation.",
          description: "Please try again later.",
          status: "error",
        });
        return;
      }

      if (tokenClient)
        (tokenClient as any).callback = () => {
          onAuth();
          setIsAuthorised(true);
        };

      if (gapi.client.getToken() === null) {
        tokenClient.requestAccessToken({
          prompt: "consent",
        });
      } else {
        tokenClient.requestAccessToken({ prompt: "" });
      }
    },
    [toast, tokenClient]
  );

  return (
    <GapiContext.Provider value={{ isAuthorised, requestAuth }}>
      {children}
      <Script src="https://apis.google.com/js/api.js" onLoad={onGapiLoaded} />
      <Script
        src="https://accounts.google.com/gsi/client"
        onLoad={onGisLoaded}
      />
    </GapiContext.Provider>
  );
}

export const useGapiAuth = () => {
  return useContext(GapiContext);
};
