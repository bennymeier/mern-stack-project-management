export const SET_ERRORS = "SET_ERRORS";

interface SetErrors {
  type: typeof SET_ERRORS;
  payload: any;
}

export type ErrorActionTypes = SetErrors;
