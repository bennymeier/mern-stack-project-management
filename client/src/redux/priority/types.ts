import { Priority } from "../../utils/API/priority_API";

export const SET_PRIORITIES = "SET_PRIORITIES";

interface SetPriorities {
  type: typeof SET_PRIORITIES;
  payload: Priority[];
}
export type PriorityActionTypes = SetPriorities;
