import {
  SET_CURRENT_USER,
  USER_LOADING,
  AuthState,
  AuthActionTypes,
} from "./types";

const isEmpty = require("is-empty");

const initialState: AuthState = {
  isAuthenticated: false,
  user: undefined,
  loading: false,
};

export const authReducer = (state = initialState, action: AuthActionTypes) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
