import { API } from "./API";

export type UserRoles = "Administrator" | "Client" | "Employee";
export interface UserStatus {
  text: string;
  editedAt: string;
  until?: string;
}
export interface User {
  _id: string;
  email: string;
  firstname: string;
  avatar: string;
  lastname: string;
  role: UserRoles;
  status: UserStatus;
  favoriteProjects: string[];
}

export interface UpdateUser {
  success: boolean;
  message: string;
  error: string;
}
export const updateUser = async (
  id: string,
  user: Partial<User>
): Promise<UpdateUser> => {
  try {
    const { data } = await API.put<any>(`/user/${id}`, user);
    return data;
  } catch (err) {
    return err;
  }
};

export interface GetUserByMail {
  success: boolean;
  error: string;
  data: User;
}
export const getUserByMail = async (email: string): Promise<GetUserByMail> => {
  try {
    const { data } = await API.get<any>(`/user/${email}`);
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export interface GetUsers {
  success: boolean;
  error?: string;
  data: User[];
}
export const getUsers = async (): Promise<GetUsers> => {
  try {
    const { data } = await API.get<any>("/users");
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};
