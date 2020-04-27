export type UserRoles = "Administrator" | "Client" | "Employee";
export interface UserStatus {
  text: string;
  editedAt: string;
  until?: string;
}
export interface UserData {
  email: string;
  firstname: string;
  avatar?: string;
  lastname?: string;
  role?: UserRoles;
  status?: UserStatus;
}
