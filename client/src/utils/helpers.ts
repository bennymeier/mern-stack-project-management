import { IssueTypeIds } from "./API/issuetype_API";

export const getLocale = () => {
  return window.navigator.language.split("-")[0];
};

export const getIssueTypeIcon = (id: IssueTypeIds) => {
  if (id === "task") {
    return { name: "check square", color: "blue" };
  } else if (id === "epic") {
    return { name: "bolt", color: "violet" };
  } else if (id === "story") {
    return { name: "tasks", color: "green" };
  }
  return { name: "bug", color: "red" };
};
