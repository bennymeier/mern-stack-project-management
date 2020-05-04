import { SET_ISSUE_TYPES } from "./types";
import { IssueType } from "../../utils/API/issuetype_API";

export const setIssueTypes = (issuetypes: IssueType[]) => {
  return {
    type: SET_ISSUE_TYPES,
    payload: issuetypes,
  } as const;
};
