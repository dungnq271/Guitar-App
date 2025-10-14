import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useLayoutEffect,
} from "react";
import { storeJwt, storeRefreshToken } from "~/lib/auth";
import { type User } from "~/utils/models";
import { usePersistor, LocalStorageManager } from "~/lib/persistor";
import { useRef } from "react";
import { Navigate, Outlet } from "react-router";
import { getJwt, getRefreshToken } from "~/lib/auth";

interface AuthContextType {
  user: User | null;
  setUser: (user: User) => void;
  jwt: string;
  setJwt: (data: string) => void;
  refreshToken: string;
  setRefreshToken: (token: string) => void;
}

const initialContextValues = {
  user: null,
  setUser: () => null,
  jwt: "",
  setJwt: () => null,
  refreshToken: "",
  setRefreshToken: () => null,
};

const AuthContext = createContext<AuthContextType>(initialContextValues);

interface Props {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  // State to hold the authentication token
  const driver = useRef(new LocalStorageManager()).current;
  const [user, setUser] = useState<User | null>(null);
  /* const [jwt, setJwt] = useState<string>(""); */
  const [jwt, setJwt] = usePersistor("jwt", "", driver);
  /* const [refreshToken, setRefreshToken] = useState<string>(""); */
  const [refreshToken, setRefreshToken] = usePersistor(
    "refreshToken",
    "",
    driver,
  );

  // TODO: check why user is set to null when refreshing page
  useEffect(() => {
    if (jwt) {
      console.log("set jwt to axios");
      axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
      /* storeJwt(jwt);
       * storeRefreshToken(refreshToken); */
    } else {
      delete axios.defaults.headers.common["Authorization"];
      /* storeJwt("");
       * storeRefreshToken(""); */
    }
  }, [jwt, refreshToken]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      user,
      setUser,
      jwt,
      setJwt,
      refreshToken,
      setRefreshToken,
    }),
    [jwt, refreshToken],
  );

  // Provide the authentication context to the children components
  return (
    // @ts-ignore
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
