import { UserData } from "../../components/types";

export interface UsersState {
  users: UserData[];
}

export const SET_USERS = "SET_USERS";
export const SET_USER = "SET_USER";
export const ADD_USER = "ADD_USER";
export const DELETE_USER = "DELETE_USER";

export interface SetUsers {
  type: typeof SET_USERS;
  payload: UserData[];
}

export interface SetUser {
  type: typeof SET_USER;
  payload: UserData;
}

export interface AddUser {
  type: typeof ADD_USER;
  payload: UserData;
}

export interface DeleteUser {
  type: typeof DELETE_USER;
  payload: UserData;
}

export type UsersActionTypes = SetUsers | SetUser | AddUser | DeleteUser;
