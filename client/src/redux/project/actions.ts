import { SET_PROJECT } from "./types";
import { Project } from "../../utils/API/project_API";

export const setCurrentProject = (currentProject: Project) => {
  return {
    type: SET_PROJECT,
    payload: currentProject,
  } as const;
};
