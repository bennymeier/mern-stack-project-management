import { Room } from "../../utils/API/API";
import { Project } from "../../utils/API/project_API";

export const SET_PROJECT = "SET_PROJECT";

interface SetCurrentProject {
  type: typeof SET_PROJECT;
  payload: Project;
}
export type ProjectActionTypes = SetCurrentProject;
