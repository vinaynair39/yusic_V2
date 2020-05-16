import React from "react";
import { Router, HashRouter, Switch } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

import createHistory from "history/createBrowserHistory";
import App from "../App";
import LoginPage from "../pages/LoginPage/LoginPage";
import VideosPage from "../pages/VideosPage/VideosPage";
import SearchPage from "../pages/SearchPage/SearchPage";

export const history = createHistory();

const AppRouter: React.FC = () => (
  <Router history={history}>
    <div>
      <Switch>
        <HashRouter basename="/">
          <PublicRoute path="/login" component={LoginPage} exact={true} />
          <PrivateRoute path="/" component={App} exact={true} />
          <PrivateRoute path="/videos" component={VideosPage} exact={true} />
          <PrivateRoute path="/search" component={SearchPage} exact={true} />
        </HashRouter>
      </Switch>
    </div>
  </Router>
);
export default AppRouter;
