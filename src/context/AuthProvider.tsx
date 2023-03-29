import React, { PropsWithChildren } from "react";
import secureLocalStorage from "react-secure-storage";

const defaultContext = {
  token: "",
  addToken: () => {},
  clearToken: () => {},
};

const AuthContext = React.createContext<{
  token: string;
  addToken: (token: string) => void;
  clearToken: () => void;
}>(defaultContext);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = React.useState("");

  React.useEffect(() => {
    const token = secureLocalStorage.getItem("open-ai-token") as string;
    if (token) {
      setToken(token);
    }
  }, []);

  const addToken = (token: string) => {
    setToken(token);
    secureLocalStorage.setItem("open-ai-token", token);
  };

  const clearToken = () => {
    setToken("");
    secureLocalStorage.removeItem("open-ai-token");
  };

  const value = React.useMemo(() => ({ token, addToken, clearToken }), [token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => React.useContext(AuthContext);
