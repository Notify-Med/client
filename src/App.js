import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./global/navbar";
import Login from "./components/login/login";
import Register from "./components/register/register";
import HomePage from "./components/homePage/HomePage";
import NotificationForm from "./components/notificationForm/NotificationForm";
import NotificationPage from "./components/notificationPage/NotificationPage";
import SentNotificationPage from "./components/sentNotificationsPage/SentNotificationsPage";
import NotificationCardPage from "./components/notificationCardPage/NotificationCardPage";
// import Profile from "./components/profile";

function App() {
  const [theme, colorMode] = useMode();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <Routes>
              <Route
                path="/login"
                element={
                  <Login
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                  />
                }
              />
              <Route path="/register" element={<Register />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/form" element={<NotificationForm />} />
              <Route path="/my-notifications" element={<NotificationPage />} />
              <Route
                path="/my-notifications/:id"
                element={<NotificationCardPage />}
              />
              <Route
                path="/sent-notifications"
                element={<SentNotificationPage />}
              />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
