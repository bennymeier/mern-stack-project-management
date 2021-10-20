import { API } from "./API";

export type PriorityIds = "highest" | "high" | "medium" | "low" | "lowest";
export interface Priority {
  id: PriorityIds;
  label: string;
  color?: string;
  icon?: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePriority {
  success: boolean;
  error: string;
  data: Priority;
}
export const createPriority = async (
  priority: Partial<Priority>
): Promise<CreatePriority> => {
  try {
    const { data } = await API.post<any>("/priority", priority);
    return data;
  } catch (err) {
    return err;
  }
};

export interface GetPriority {
  success: boolean;
  data: Priority;
}
export const getPriority = async (id: string): Promise<GetPriority> => {
  try {
    const { data } = await API.get<any>(`/priority/${id}`);
    return data;
  } catch (err) {
    return err;
  }
};

export interface GetPriorities {
  success: boolean;
  data: Priority[];
  error: string;
}
export const getPriorities = async (): Promise<GetPriorities> => {
  try {
    const { data } = await API.get<any>("/priorities");
    return data;
  } catch (err) {
    return err;
  }
};

export interface UpdatePriority {
  success: boolean;
  message: string;
}
export const updatePriority = async (
  id: string,
  priority: Partial<Priority>
): Promise<UpdatePriority> => {
  try {
    const { data } = await API.put<any>(`/priority/${id}`, priority);
    return data;
  } catch (err) {
    return err;
  }
};

export interface DeletePriority {
  success: boolean;
  id: string;
  error: string;
}
export const deletePriority = async (id: string): Promise<DeletePriority> => {
  try {
    const { data } = await API.delete<any>(`/priority/${id}`);
    return data;
  } catch (err) {
    return err;
  }
};
