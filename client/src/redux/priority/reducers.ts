import { PriorityActionTypes, SET_PRIORITIES } from "./types";
import { Priority } from "../../utils/API/priority_API";

const initialState: Priority[] = [];

export const priorityReducer = (
  state = initialState,
  action: PriorityActionTypes
): Priority[] => {
  switch (action.type) {
    case SET_PRIORITIES:
      return action.payload;
    default:
      return state;
  }
};
