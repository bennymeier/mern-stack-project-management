import { API } from "./API";

export interface Avatar {
  mimetype: string;
  filename: string;
  destination: string;
  size: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
}
export interface UploadAvatar {
  success: boolean;
  error: string;
  data: Avatar;
  message: string;
}
export const uploadAvatar = async (
  userId: string,
  avatar: any
): Promise<UploadAvatar> => {
  try {
    const { data } = await API.post(`/avatar/${userId}`, avatar, {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log(percentCompleted);
      },
    });
    return data;
  } catch (err) {
    return err;
  }
};

export interface DeleteAvatar {
  success: boolean;
  error: string;
  id: string;
  message: string;
}
export const deleteAvatar = async (userId: string): Promise<DeleteAvatar> => {
  try {
    const { data } = await API.delete(`/avatar/${userId}`);
    return data;
  } catch (err) {
    return err;
  }
};

// export const getIssue = async (id: string): Promise<GetIssue> => {
//   try {
//     const { data } = await API.get(`/issue/${id}`);
//     return data;
//   } catch (err) {
//     return err;
//   }
// };

// export interface GetIssues {
//   success: boolean;
//   data: Issue[];
//   error: string;
// }
// export const getIssues = async (): Promise<GetIssues> => {
//   try {
//     const { data } = await API.get("/issues");
//     return data;
//   } catch (err) {
//     return err;
//   }
// };

// export interface UpdateAvatar {
//   success: boolean;
//   message: string;
// }
// export const updateAvatar = async (
//   id: string,
//   avatar: Partial<Issue>
// ): Promise<UpdateAvatar> => {
//   try {
//     const { data } = await API.put(`/avatar/${id}`, avatar);
//     return data;
//   } catch (err) {
//     return err;
//   }
// };
