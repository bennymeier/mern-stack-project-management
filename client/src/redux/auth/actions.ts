import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER, USER_LOADING } from "./types";
import { SET_ERRORS } from "../error/types";
import { API } from "../../utils/API/API";
import { User } from "../../utils/API/user_API";

export interface RegisterData {
  firstname: string;
  lastname?: string;
  email: string;
  password: string;
  password2: string;
}
export type LoginData = Omit<RegisterData, "name" | "password2" | "firstname">;
// Register User
export const registerUser =
  (userData: RegisterData, history: any) => (dispatch: any) => {
    API.post("/register", userData)
      .then(() => history.push("/"))
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data,
        });
      });
  };

// Login - get user token
export const loginUser = (userData: LoginData) => (dispatch: any) => {
  API.post("/login", userData)
    .then((res: any) => {
      // Save to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded: User = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) => {
      console.log(err)
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Set logged in user
export const setCurrentUser = (decoded: User) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  } as const;
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  } as const;
};

// Log user out
export const logoutUser = () => (dispatch: any) => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken("");
  // Set current user to null which will set isAuthenticated to false
  dispatch(setCurrentUser(null));
};
