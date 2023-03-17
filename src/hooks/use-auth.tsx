import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";
import { LoginCredential, login } from "../api/auth/use-login";
import { getUser } from "../api/user/use-user";
import useLocalStorage from "./use-local-storage";
import { LOGIN } from "../constants/routes";
import { useQueryClient } from "@tanstack/react-query";

export type TAuthAction = {
  /**
   * Login with email and password or social login token
   * @param credential
   * @returns The user if login is successful else it returns null
   */
  login: (
    credential: LoginCredential,
    loginOptions?: {
      onSuccess: (user?: User) => void;
      onError: (error?: Error) => void;
    }
  ) => Promise<User | undefined>;
  /**
   * Logout the user
   */
  logout: () => Promise<void>;
};

const AuthActionContext = createContext<TAuthAction>({
  login: async () => {
    throw new Error("Not implemented");
  },
  logout: async () => {
    throw new Error("Not implemented");
  },
});

type TAuthState = {
  user?: User;
  authToken: string | null;
  isLoggingIn: boolean;
  error?: Error | null;
};

const AuthStateContext = createContext<TAuthState>({
  isLoggingIn: false,
  authToken: null,
});

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState<Error | null | undefined>();
  const [authToken, setAuthToken] = useLocalStorage<string | null>(
    "token",
    null
  );
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    setIsLoggingIn(true);
    if (authToken)
      getUser()
        .then((user) => {
          setUser(user);
        })
        .catch(() => {
          setUser(undefined);
          setAuthToken(null);
          queryClient.clear();
          router.push(LOGIN);
        })
        .finally(() => {
          setIsLoggingIn(false);
        });
    else setIsLoggingIn(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loginFn: TAuthAction["login"] = async (credential, opts) => {
    setIsLoggingIn(true);
    let token: string;
    try {
      const loginRes = await login(credential);
      token = loginRes.token;

      setAuthToken(token);
      const user = loginRes.user;
      setUser(user);
      setIsLoggingIn(false);
      opts?.onSuccess(user);
      return user;
    } catch (error: any) {
      setError(error);
      setIsLoggingIn(false);
      if (opts?.onError) opts.onError(error);
      else throw error;
    }
  };
  const logout: TAuthAction["logout"] = async () => {
    setUser(undefined);
    setAuthToken(null);
    queryClient.clear();
  };

  return (
    <AuthActionContext.Provider
      value={{
        login: loginFn,
        logout: logout,
      }}
    >
      <AuthStateContext.Provider
        value={{ user, authToken, isLoggingIn, error }}
      >
        {children}
      </AuthStateContext.Provider>
    </AuthActionContext.Provider>
  );
};

/**
 * Users of this hook within authenticated routes can expect it to always return the user immediately escept if there's an error.
 * This happens because rendering of authenticated routes is blocked until the user is fetched.
 */
const useAuth = () => {
  const authState = useContext(AuthStateContext);
  const authAction = useContext(AuthActionContext);

  return {
    user: authState.user,
    authToken: authState.authToken,
    isLoggingIn: authState.isLoggingIn,
    error: authState.error,
    login: authAction.login,
    logout: authAction.logout,
  };
};

export default useAuth;
