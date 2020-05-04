import { SET_KANBAN_TYPES } from "./types";
import { KanbanType } from "../../utils/API/kanbantype_API";

export const setKanbanTypes = (kanbanTypes: KanbanType[]) => {
  return {
    type: SET_KANBAN_TYPES,
    payload: kanbanTypes,
  } as const;
};
