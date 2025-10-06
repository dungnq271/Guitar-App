import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { setJwtToken, setRefreshToken } from "~/lib/auth";

interface AuthContextType {
  token: string | null;
  setToken: (token?: string) => void;
}

const initialContextValues = {
  token: null,
  setToken: () => null,
};

const AuthContext = createContext<AuthContextType>(initialContextValues);

interface Props {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  // State to hold the authentication token
  const [token, setToken_] = useState<string>(localStorage.getItem("token"));

  // Function to set the authentication token
  const setToken = (token?: string) => {
    setToken_(token);
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      setJwtToken(token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      setJwtToken("");
    }
  }, [token]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token],
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
