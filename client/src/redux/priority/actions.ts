import { SET_PRIORITIES } from "./types";
import { Priority } from "../../utils/API/priority_API";

export const setPriorities = (priorities: Priority[]) => {
  return {
    type: SET_PRIORITIES,
    payload: priorities,
  } as const;
};
