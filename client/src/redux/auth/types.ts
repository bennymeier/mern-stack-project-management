import { UserData } from "../../components/types";

export interface AuthState {
  isAuthenticated: boolean;
  user: UserData | undefined;
  loading: boolean;
}

export const USER_LOADING = "USER_LOADING";
export const SET_CURRENT_USER = "SET_CURRENT_USER";

export interface UserLoading {
  type: typeof USER_LOADING;
  payload: any;
}

export interface SetCurrentUser {
  type: typeof SET_CURRENT_USER;
  payload: UserData;
}

export type AuthActionTypes = UserLoading | SetCurrentUser;
