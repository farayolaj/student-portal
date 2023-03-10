import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { login, LoginCredential } from "../api/auth";
import { getUser } from "../api/user";
import useLocalStorage from "./use-local-storage";

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
  authToken?: string;
  isLoggingIn: boolean;
  error?: Error | null;
};

const AuthStateContext = createContext<TAuthState>({
  isLoggingIn: false,
});

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState<Error | null | undefined>();
  const [authToken, setAuthToken] = useLocalStorage<string | undefined>(
    "token",
    undefined
  );

  useEffect(() => {
    setIsLoggingIn(true);
    if (authToken)
      getUser()
        .then((user) => {
          setUser(user);
        })
        .finally(() => {
          setIsLoggingIn(false);
        });
    else setIsLoggingIn(false);
  }, [authToken]);

  const loginFn: TAuthAction["login"] = async (credential, opts) => {
    setIsLoggingIn(true);
    let token: string;
    try {
      token = await login(credential);

      setAuthToken(token);
      const user = await getUser();
      setUser(user);
      setIsLoggingIn(false);
      opts?.onSuccess(user);
      return user;
    } catch (err: any) {
      const error = new Error("Login failed. Check your details.", {
        cause: err,
      });
      setError(error);
      setIsLoggingIn(false);
      if (opts?.onError) opts.onError(error);
      else throw error;
    }
  };
  const logout: TAuthAction["logout"] = async () => {
    setUser(undefined);
    setAuthToken(undefined);
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
