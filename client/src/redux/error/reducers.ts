import { GET_ERRORS, ErrorActionTypes } from "./types";

const initialState = {};

export const errorReducer = (
  state = initialState,
  action: ErrorActionTypes
) => {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
};
