import { IssueTypeActionTypes, SET_ISSUE_TYPES } from "./types";
import { IssueType } from "../../utils/API/issuetype_API";

const initialState: IssueType[] = [];

export const issueTypeReducer = (
  state = initialState,
  action: IssueTypeActionTypes
): IssueType[] => {
  switch (action.type) {
    case SET_ISSUE_TYPES:
      return action.payload;
    default:
      return state;
  }
};
