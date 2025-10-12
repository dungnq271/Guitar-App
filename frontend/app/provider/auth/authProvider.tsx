import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { storeJwt, storeRefreshToken } from "~/lib/auth";
import { type User } from "~/utils/models";
import { getJwt, getRefreshToken } from "~/lib/auth";

interface AuthContextType {
  user: User | null;
  setUser: (user: User) => void;
  jwt: string;
  setJwt: (token: string) => void;
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
  const [user, setUser] = useState<User | null>(null);
  const [jwt, setJwt_] = useState<string>("");
  const [refreshToken, setRefreshToken_] = useState<string>("");

  // Function to set the authentication token
  const setJwt = (token: string) => {
    setJwt_(token);
  };

  const setRefreshToken = (token: string) => {
    setRefreshToken_(token);
  };

  // TODO: check why user is set to null when refreshing page
  useLayoutEffect(() => {
    const jwtFromStorage = getJwt();
    if (jwtFromStorage) {
      console.log("Called jwtFromStorage");
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + jwtFromStorage;
      setJwt(jwtFromStorage);
      setRefreshToken(getRefreshToken());
    }
  });

  useEffect(() => {
    if (jwt) {
      console.log("Called jwt");
      axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
      storeJwt(jwt);
      storeRefreshToken(refreshToken);
    }
    /* else {
     *   console.log("set user null");
     *   delete axios.defaults.headers.common["Authorization"];
     *   setUser(null);
     *   storeJwt("");
     *   storeRefreshToken("");
     * } */
  }, [jwt, refreshToken]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      jwt,
      setJwt,
      refreshToken,
      setRefreshToken,
    }),
    [jwt, refreshToken],
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={{ user, setUser, ...contextValue }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
