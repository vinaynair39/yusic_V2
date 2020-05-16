import React from "react";
import { RouteProps, Route, Redirect } from "react-router-dom";
import { useSelector, DefaultRootState } from "react-redux";

interface PublicRouteProps extends RouteProps {
  component: React.FC;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );
  return (
    <Route
      {...rest}
      component={(props: any) =>
        isAuthenticated ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default PublicRoute;
