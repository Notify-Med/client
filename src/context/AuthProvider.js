import { createContext, useState } from "react";
import io from "socket.io-client";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const socket = io("http://localhost:4000");

  return (
    <AuthContext.Provider value={{ auth, setAuth, socket }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
