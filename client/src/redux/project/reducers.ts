import { ProjectActionTypes, SET_PROJECT } from "./types";
import { Project } from "../../utils/API/project_API";

const initialState: Project = null;

export const projectReducer = (
  state = initialState,
  action: ProjectActionTypes
): Project => {
  switch (action.type) {
    case SET_PROJECT:
      return action.payload;
    default:
      return state;
  }
};
