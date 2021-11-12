import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { AppState } from "../../redux";
import { AuthState } from "../../redux/auth/types";

// const PrivateRoute: React.FC<any> = ({
//   component: Component,
//   auth,
//   ...rest
// }) => (
//   <Route
//     {...rest}
//     render={(props) =>
//       auth.isAuthenticated ? (
//         <Component {...props} />
//       ) : (
//         <Navigate replace to="/" />
//       )
//     }
//   />
// );^
interface PrivateRouteProps {
  auth: AuthState;
  children: any;
}

const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
  const { children, auth } = props;
  return auth.isAuthenticated ? children : <Navigate to="/" />;
};

const mapStateToProps = (state: AppState) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(PrivateRoute);
