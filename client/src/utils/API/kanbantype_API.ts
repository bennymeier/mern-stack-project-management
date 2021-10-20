import { API } from "./API";

export interface KanbanType {
  label: string;
  className?: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateKanbanType {
  success: boolean;
  error: string;
  data: KanbanType;
}
export const createKanbanType = async (
  kanbantype: Partial<KanbanType>
): Promise<CreateKanbanType> => {
  try {
    const { data } = await API.post<any>("/kanbantype", kanbantype);
    return data;
  } catch (err) {
    return err;
  }
};

export interface GetKanbanType {
  success: boolean;
  data: KanbanType;
}
export const getKanbanType = async (id: string): Promise<GetKanbanType> => {
  try {
    const { data } = await API.get<any>(`/kanbantype/${id}`);
    return data;
  } catch (err) {
    return err;
  }
};

export interface GetKanbanTypes {
  success: boolean;
  data: KanbanType[];
  error: string;
}
export const getKanbanTypes = async (): Promise<GetKanbanTypes> => {
  try {
    const { data } = await API.get<any>("/kanbantypes");
    return data;
  } catch (err) {
    return err;
  }
};

export interface UpdateKanbanType {
  success: boolean;
  message: string;
}
export const updateKanbanType = async (
  id: string,
  priority: Partial<KanbanType>
): Promise<UpdateKanbanType> => {
  try {
    const { data } = await API.put<any>(`/kanbantype/${id}`, priority);
    return data;
  } catch (err) {
    return err;
  }
};

export interface DeleteKanbanType {
  success: boolean;
  id: string;
  error: string;
}
export const deleteKanbanType = async (
  id: string
): Promise<DeleteKanbanType> => {
  try {
    const { data } = await API.delete<any>(`/kanbantype/${id}`);
    return data;
  } catch (err) {
    return err;
  }
};
