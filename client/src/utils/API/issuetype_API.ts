import { API } from "./API";

export type IssueTypeIds = "bug" | "epic" | "story" | "task";
export interface IssueType {
  id: IssueTypeIds;
  label: string;
  color?: string;
  icon?: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateIssueType {
  success: boolean;
  error: string;
  data: IssueType;
}
export const createIssueType = async (
  issuetype: Partial<IssueType>
): Promise<CreateIssueType> => {
  try {
    const { data } = await API.post<any>("/issuetype", issuetype);
    return data;
  } catch (err) {
    return err;
  }
};

export interface GetIssueType {
  success: boolean;
  data: IssueType;
}
export const getIssueType = async (id: string): Promise<GetIssueType> => {
  try {
    const { data } = await API.get<any>(`/issuetype/${id}`);
    return data;
  } catch (err) {
    return err;
  }
};

export interface GetIssueTypes {
  success: boolean;
  data: IssueType[];
  error: string;
}
export const getIssueTypes = async (): Promise<GetIssueTypes> => {
  try {
    const { data } = await API.get<any>("/issuetypes");
    return data;
  } catch (err) {
    return err;
  }
};

export interface UpdateIssueType {
  success: boolean;
  message: string;
}
export const updateIssueType = async (
  id: string,
  issuetype: Partial<IssueType>
): Promise<UpdateIssueType> => {
  try {
    const { data } = await API.put<any>(`/issuetype/${id}`, issuetype);
    return data;
  } catch (err) {
    return err;
  }
};

export interface DeleteIssueType {
  success: boolean;
  id: string;
  error: string;
}
export const deleteIssueType = async (id: string): Promise<DeleteIssueType> => {
  try {
    const { data } = await API.delete<any>(`/issuetype/${id}`);
    return data;
  } catch (err) {
    return err;
  }
};
