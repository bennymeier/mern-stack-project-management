import { SET_USERS, ADD_USER, DELETE_USER, SET_USER } from "./types";
import { User } from "../../utils/API/user_API";

export const setUsers = (users: User[]) => {
  return {
    type: SET_USERS,
    payload: users,
  } as const;
};

export const setUser = (user: User) => {
  return {
    type: SET_USER,
    payload: user,
  } as const;
};

export const addUser = (user: User) => {
  return {
    type: ADD_USER,
    payload: user,
  } as const;
};

export const deleteUser = (user: User) => {
  return {
    type: DELETE_USER,
    payload: user,
  } as const;
};
