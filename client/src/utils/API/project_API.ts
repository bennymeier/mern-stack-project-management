import axios from "axios";
import { API } from "../API";
import Projects from "../../pages/Projects";

export interface Project {
  name: string;
  key: string;
  members: string[];
  administrators: string[];
  createdAt: string;
  updatedAt: string;
  _id: string;
}

export interface CreateProject {
  success: boolean;
  error: string;
  data: Project;
}
export type PartialProject = Omit<
  Project,
  "members" | "administrators" | "createdAt" | "updatedAt" | "_id"
>;
export const createProject = async (
  project: PartialProject
): Promise<CreateProject> => {
  try {
    const { data } = await API.post("/project", project);
    return data;
  } catch (err) {
    return err;
  }
};

export interface GetProject {
  success: boolean;
  data: Project;
}
export const getProject = async (id: string): Promise<GetProject> => {
  try {
    const { data } = await API.get(`/project/${id}`);
    return data;
  } catch (err) {
    return err;
  }
};

export interface GetProjects {
  success: boolean;
  data: Project[];
  error: string;
}
export const getProjects = async (): Promise<GetProjects> => {
  try {
    const { data } = await API.get("/projects");
    return data;
  } catch (err) {
    return err;
  }
};

export interface UpdateProject {
  success: boolean;
  message: string;
}
export const updateProject = async (
  id: string,
  project: Partial<Project>
): Promise<UpdateProject> => {
  try {
    const { data } = await API.put(`/project/${id}`, project);
    return data;
  } catch (err) {
    return err;
  }
};

export interface DeleteProject {
  success: boolean;
  id: string;
  error: string;
}
export const deleteProject = async (id: string): Promise<DeleteProject> => {
  try {
    const { data } = await API.delete(`/project/${id}`);
    return data;
  } catch (err) {
    return err;
  }
};
