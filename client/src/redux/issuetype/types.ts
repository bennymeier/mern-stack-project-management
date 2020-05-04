import { IssueType } from "../../utils/API/issuetype_API";

export const SET_ISSUE_TYPES = "SET_ISSUE_TYPES";

interface SetIssueTypes {
  type: typeof SET_ISSUE_TYPES;
  payload: IssueType[];
}
export type IssueTypeActionTypes = SetIssueTypes;
