import { KanbanType } from "../../utils/API/kanbantype_API";

export const SET_KANBAN_TYPES = "SET_KANBAN_TYPES";

interface SetKanbanTypes {
  type: typeof SET_KANBAN_TYPES;
  payload: KanbanType[];
}
export type KanbanTypeActionTypes = SetKanbanTypes;
