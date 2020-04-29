import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { AppState } from "../../redux";

const PrivateRoute: React.FC<any> = ({
  component: Component,
  auth,
  ...rest
}) => (
    <Route
      {...rest}
      render={(props) =>
        auth.isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
);

const mapStateToProps = (state: AppState) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(PrivateRoute);
