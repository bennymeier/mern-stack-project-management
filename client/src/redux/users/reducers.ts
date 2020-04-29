import {
  ADD_USER,
  DELETE_USER,
  SET_USERS,
  UsersActionTypes,
  SET_USER,
} from "./types";
import { User } from "../../utils/API/user_API";

export const usersReducer = (
  state: User[] = [],
  action: UsersActionTypes
): User[] => {
  switch (action.type) {
    case SET_USERS:
      return action.payload;
    case SET_USER:
      return state.map((user) => {
        if (user.email === action.payload.email) {
          return action.payload;
        }
        return user;
      });
    case ADD_USER:
      return [...state, action.payload];
    case DELETE_USER:
      return state.filter((user) => user.email !== action.payload.email);
    default:
      return state;
  }
};
