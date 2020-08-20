import React from "react";
import { Route } from "react-router-dom";
import { AuthConsumer } from "../../providers/authProvider";
import LoadingSpinner from "components/LoadingSpinner";

export const PrivateRoute = ({ component, ...rest }) => {
  const renderFn = Component => props => (
    <AuthConsumer>
      {(authContext) => {
        if(!Component){
            return <h2>Empty child component</h2>
        }
        const isAuth = authContext.isAuthenticated();
        if (isAuth) {
          return <Component {...props} />;
        } else {
          authContext.loginAsync(false);
          return <LoadingSpinner/>;
        }
      }}
    </AuthConsumer>
  );

  return <Route {...rest} render={renderFn(component)} />;
};
