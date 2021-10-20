import axios from "axios";

const getToken = () => localStorage.getItem("jwtToken");
export const API = axios.create({
  baseURL: "http://localhost:1400/api",
  responseType: "json",
  headers: { Authorization: `${getToken()}` },
});

export interface GeneralAxiosRes {
  data: any;
  success: boolean;
}

export interface Room {
  members: string[];
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
  __v: number;
}

export interface GetRooms {
  success: boolean;
  data: Room[];
}

export const getRooms = async (): Promise<GetRooms> => {
  try {
    const { data } = await API.get<GeneralAxiosRes>("/rooms");
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export interface GetRoom {
  success: boolean;
  data: Room;
}

export const getRoom = async (roomId: string): Promise<GetRoom> => {
  try {
    const { data } = await API.get<GeneralAxiosRes>(`/room/${roomId}`);
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export interface DeleteRoom {
  success: boolean;
  data: Room;
}

export const deleteRoom = async (roomId: string): Promise<DeleteRoom> => {
  try {
    const { data } = await API.delete<GeneralAxiosRes>(`/room/${roomId}`);
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export interface UpdateRoom {
  success: boolean;
  id: string;
  message: string;
}

export const updateRoom = async (
  roomId: string,
  roomData: Partial<Room>
): Promise<UpdateRoom> => {
  try {
    const { data } = await API.put<any>(`/room/${roomId}`, roomData);
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

type RoomData = Omit<Message, "_id" | "__v" | "createdAt" | "updatedAt">;
export interface CreateRoom {
  success: boolean;
  message: string;
  id: string;
}

export const createRoom = async (roomData: RoomData): Promise<CreateRoom> => {
  try {
    const { data } = await API.post<any>(`/room`, roomData);
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export interface Message {
  body: string;
  createdAt: string;
  isEdited: boolean;
  from: string;
  updatedAt: string;
  to: string;
  _id: string;
  __v: string;
}

export interface GetMessages {
  success: boolean;
  data: Message[];
}

export const getMessages = async (to: string): Promise<GetMessages> => {
  try {
    const { data } = await API.get<GeneralAxiosRes>(`/messages/${to}`);
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export interface GetMessage {
  success: boolean;
  data: Message;
}

export const getMessage = async (messageId: string): Promise<GetMessage> => {
  try {
    const { data } = await API.get<GeneralAxiosRes>(`/message/${messageId}`);
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export interface DeleteMessage {
  success: boolean;
  data: Message;
}

export const deleteMessage = async (
  messageId: string
): Promise<DeleteMessage> => {
  try {
    const { data } = await API.delete<GeneralAxiosRes>(`/message/${messageId}`);
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export interface UpdateMessage {
  success: boolean;
  id: string;
  message: string;
}

export const updateMessage = async (
  messageId: string,
  messageData: Partial<Message>
): Promise<UpdateMessage> => {
  try {
    const { data } = await API.put<any>(`/message/${messageId}`, messageData);
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

type MessageData = Omit<
  Message,
  "_id" | "isEdited" | "__v" | "createdAt" | "updatedAt"
>;
export interface CreateMessage {
  success: boolean;
  message: string;
  data: Message;
}

export const createMessage = async (
  messageData: MessageData
): Promise<CreateMessage> => {
  try {
    const { data } = await API.post<any>(`/message`, messageData);
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};
