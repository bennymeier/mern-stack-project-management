import React from "react";
import moment from "moment";
import { getLocale } from "./utils/helpers";
import { Provider } from "react-redux";
import { configureStore } from "./redux/index";
import Home from "./components/private-route/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Landing from "./components/auth/Landing";
import PrivateRoute from "./components/private-route/PrivateRoute";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./redux/auth/actions";
import { SetCurrentUser } from "./redux/auth/types";
import Room from "./components/Room/Room";
import { UserData } from "./components/types";
moment.locale(getLocale());

const store = configureStore();

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded: UserData = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded) as SetCurrentUser);
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if ((decoded as any).exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser() as any);
    // Redirect to login
    window.location.href = "./login";
  }
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Switch>
          <PrivateRoute exact path="/home" component={Home} />
          <PrivateRoute exact path="/room/:id" component={Room} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
