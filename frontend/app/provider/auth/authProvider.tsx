import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { storeJwt, storeRefreshToken } from "~/lib/auth";
import { type User } from "~/utils/models";

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
  const [user, setUser] = useState<User>();
  const [jwt, setJwt_] = useState<string>("");
  const [refreshToken, setRefreshToken_] = useState<string>("");

  // Function to set the authentication token
  const setJwt = (token: string) => {
    setJwt_(token);
  };

  const setRefreshToken = (token: string) => {
    setRefreshToken_(token);
  };

  useEffect(() => {
    if (jwt) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
      storeJwt(jwt);
      storeRefreshToken(refreshToken);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      storeJwt("");
      storeRefreshToken("");
    }
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
