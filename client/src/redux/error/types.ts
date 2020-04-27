export const GET_ERRORS = "GET_ERRORS";

interface GetErrors {
    type: typeof GET_ERRORS;
    payload: any;
  }
  
  export type ErrorActionTypes = GetErrors;