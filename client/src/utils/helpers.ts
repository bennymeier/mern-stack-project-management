import { IssueTypeIds } from "./API/issuetype_API";
import { PriorityIds } from "./API/priority_API";

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

export const getPriorityIcon = (id: PriorityIds) => {
  if (id === "highest") {
    return { name: "arrow up", color: "red" };
  } else if (id === "high") {
    return { name: "arrow up", color: "red" };
  } else if (id === "medium") {
    return { name: "arrow up", color: "orange" };
  } else if (id === "low") {
    return { name: "arrow down", color: "green" };
  }
  return { name: "arrow down", color: "green" };
};
