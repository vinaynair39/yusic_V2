import React from "react";
import { RouteProps, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

interface PrivateRouteProps extends RouteProps {
  component: React.FC;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
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
        isAuthenticated ? (
          <div>
            <Component {...props} />
          </div>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
