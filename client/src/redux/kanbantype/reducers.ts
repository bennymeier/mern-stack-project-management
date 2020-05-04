import { KanbanTypeActionTypes, SET_KANBAN_TYPES } from "./types";
import { KanbanType } from "../../utils/API/kanbantype_API";

const initialState: KanbanType[] = [];

export const kanbanTypeReducer = (
  state = initialState,
  action: KanbanTypeActionTypes
): KanbanType[] => {
  switch (action.type) {
    case SET_KANBAN_TYPES:
      return action.payload;
    default:
      return state;
  }
};
