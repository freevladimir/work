import React, { createContext } from "react";
import { observer, Provider } from "mobx-react";
import { store } from "./store/store";
import { BrowserRouter as Router } from "react-router-dom";
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import { Navbar } from "./components/Navbar";
import "materialize-css";

export const AppStoreContext = React.createContext();

function App() {
  const { token, login, logout, userId } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        userId,
        isAuthenticated,
      }}
    >
      <AppStoreContext.Provider value={store}>
        <Router>
          {isAuthenticated}
          {routes}
        </Router>
      </AppStoreContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
