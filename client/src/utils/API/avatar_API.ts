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
  avatar: FormData
): Promise<UploadAvatar> => {
  try {
    const { data } = await API.post<any>(`/avatar/${userId}`, avatar, {
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
    const { data } = await API.delete<any>(`/avatar/${userId}`);
    return data;
  } catch (err) {
    return err;
  }
};

export interface GetAvatars {
  success: boolean;
  data: Avatar[];
  error: string;
}
export const getAvatars = async (): Promise<GetAvatars> => {
  try {
    const { data } = await API.get<any>("/avatars");
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
