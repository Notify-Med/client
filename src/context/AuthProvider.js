import { createContext, useState } from "react";
import io from "socket.io-client";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const socket = io("http://192.168.126.140:4000");
  const [notifShown, setNotifShown] = useState(false);
  const [usersEmails, setUsersEmails] = useState([]);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        socket,
        notifShown,
        setNotifShown,
        usersEmails,
        setUsersEmails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
