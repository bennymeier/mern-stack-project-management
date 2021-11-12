import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "./redux/index";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./components/auth/Landing";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./redux/auth/actions";
import { setUsers } from "./redux/users/actions";
import { routes } from "./utils/routes";
import Home from "./pages/Home";
import YourWork from "./pages/YourWork";
import Projects from "./pages/Projects";
import Dashboards from "./pages/Dashboards";
import "./index.css";
import People from "./pages/People";
import { getUsers, User, getUserByMail } from "./utils/API/user_API";
import Project from "./pages/Project";

const store = configureStore();

/**
 * Load initial data
 */
const fetchUsers = async () => {
  const { success, data } = await getUsers();
  if (success) {
    store.dispatch(setUsers(data));
  }
};

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded: User = jwt_decode(token);
  getUserByMail(decoded.email).then(({ data }) => {
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser({ ...decoded, ...data }));
    fetchUsers();
    // Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if ((decoded as any).exp < currentTime) {
      // Logout user
      store.dispatch(logoutUser() as any);
      // Redirect to login
      window.location.href = "./login";
    }
  });
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path={routes["HOME"]}
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path={routes["YOUR_WORK"]}
            element={
              <PrivateRoute>
                <YourWork />
              </PrivateRoute>
            }
          />
          <Route
            path={routes["PROJECTS"]}
            element={
              <PrivateRoute>
                <Projects />
              </PrivateRoute>
            }
          />
          <Route
            path={`${routes["PROJECTS"]}/:id`}
            element={
              <PrivateRoute>
                <Project />
              </PrivateRoute>
            }
          />
          <Route
            path={routes["DASHBOARDS"]}
            element={
              <PrivateRoute>
                <Dashboards />
              </PrivateRoute>
            }
          />
          <Route
            path={routes["PEOPLE"]}
            element={
              <PrivateRoute>
                <People />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
