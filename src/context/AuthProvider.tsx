import React, { PropsWithChildren } from "react";

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
    const token = localStorage.getItem("open-ai-token");
    if (token) {
      setToken(token);
    }
  }, []);

  const addToken = (token: string) => {
    setToken(token);
    localStorage.setItem("open-ai-token", token);
  };

  const clearToken = () => {
    setToken("");
    localStorage.removeItem("open-ai-token");
  };

  const value = React.useMemo(() => ({ token, addToken, clearToken }), [token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => React.useContext(AuthContext);
