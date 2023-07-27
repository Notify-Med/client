import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Navbar from "./global/navbar";
import Login from "./components/login/login";
import Register from "./components/register/register";
// import Notification from "./components/notification";
// import Profile from "./components/profile";


function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <div className="app">
          <main className="content">
            <Navbar />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* <Route path="/notification" element={<Notification />} /> */}
              {/* <Route path="/profile" element={<Profile />} /> */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
