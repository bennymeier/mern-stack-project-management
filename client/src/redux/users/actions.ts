import { Room } from "../../utils/API";
import { UserData } from "../../components/types";
import { SET_USERS, ADD_USER, DELETE_USER, SET_USER } from "./types";

export const setUsers = (users: UserData[]) => {
  return {
    type: SET_USERS,
    payload: users,
  } as const;
};

export const setUser = (user: UserData) => {
  return {
    type: SET_USER,
    payload: user,
  } as const;
};

export const addUser = (user: UserData) => {
  return {
    type: ADD_USER,
    payload: user,
  } as const;
};

export const deleteUser = (user: UserData) => {
  return {
    type: DELETE_USER,
    payload: user,
  } as const;
};
