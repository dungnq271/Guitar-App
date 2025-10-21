import axios from "axios";
import { createContext, useContext, useEffect, useRef } from "react";
import { Role, type User } from "~/utils/models";
import { usePersistor, useDriver, LocalStorageManager } from "~/lib/persistor";
import { parseJwt } from "~/lib/auth";
import { getUser } from "~/utils/apis";

interface AuthContextType {
  user: User;
  setUser: (user: User) => void;
  jwt: string;
  setJwt: (data: string) => void;
  refreshToken: string;
  setRefreshToken: (token: string) => void;
}

const initialContextValues = {
  user: {
    id: -1,
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    profilePicUrl: "",
    role: Role.USER,
  },
  setUser: (data: User) => null,
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
  const [driver, userDriver] = useDriver();
  const [user, setUser] = usePersistor<User>(
    "user",
    initialContextValues.user,
    userDriver as LocalStorageManager<User>,
  );
  const [jwt, setJwt] = usePersistor<string>(
    "jwt",
    "",
    driver as LocalStorageManager<string>,
  );
  const [refreshToken, setRefreshToken] = usePersistor<string>(
    "refreshToken",
    "",
    driver as LocalStorageManager<string>,
  );

  useEffect(() => {
    if (jwt) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
      /* driver.set("jwt", jwt);
       * driver.set("refreshToken", refreshToken); */
    } else {
      delete axios.defaults.headers.common["Authorization"];
      /* driver.set("jwt", "");
       * driver.set("refreshToken", ""); */
    }
  }, [jwt, refreshToken]);

  useEffect(() => {
    if (jwt && user.id === -1) {
      const parsedJwt = parseJwt(jwt as string);
      const fingerprintHash = parsedJwt?.["X-User-Fingerprint"];
      getUser({ fingerprintHash })
        .then((response) => {
          if (response.data.user) {
            setUser(response.data.user);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [jwt]);

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider
      value={{ user, setUser, jwt, setJwt, refreshToken, setRefreshToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
