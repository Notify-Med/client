import { createContext, useState } from "react";
import io from "socket.io-client";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const socket = io("http://localhost:4000");
  const [notifShown, setNotifShown] = useState(false);
  const [usersEmails, setUsersEmails] = useState([]);
  const [notifAlert, setNotifAlert] = useState(false);

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
        notifAlert,
        setNotifAlert,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
