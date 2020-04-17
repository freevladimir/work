import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AuthPage } from "./pages/AuthPage";
import { LoginPage } from "./pages/LoginPage";
import { StartPage } from "./pages/StartPage";
import load from "little-loader";
import LimitGame from "./pages/LimitGame";
import OneHour from "./pages/OneHour";
import AllGamesPage from "./pages/AllGamesPage";
import { UsersPage } from "./pages/UsersPage";
import { CreatePage } from "./pages/CreatePage";
import { FriendsPage } from "./pages/FriendsPage";
import { PeoplePage } from "./pages/PeoplePage";
load("https://use.fontawesome.com/b4135a5a57.js", function (err) {});

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/people" exact>
          <PeoplePage />
        </Route>
        <Route path="/friends" exact>
          <FriendsPage />
        </Route>
        <Route path="/limitGame" exact>
          <LimitGame/>
        </Route>
          <Route path="/oneHour" exact>
              <OneHour/>
          </Route>
        <Route path="/allgames:id" exact>
          <AllGamesPage />
        </Route>
        <Route path="/allgames" exact>
          <AllGamesPage />
        </Route>
        <Route path="/detail/:id" exact>
          <UsersPage />
        </Route>
        <Route path="/create" exact>
          <CreatePage />
        </Route>
        <Redirect to="/allgames" />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path="/" exact>
        <StartPage />
      </Route>
      <Route path="/login" exact>
        <LoginPage />
      </Route>
      <Route path="/register" exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};