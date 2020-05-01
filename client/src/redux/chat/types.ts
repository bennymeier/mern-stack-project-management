import { Room } from "../../utils/API/API";

// Describing the shape of the chat's slice of state
export interface Message {
  user: string;
  message: string;
  timestamp: number;
}

export interface ChatState {
  messages: Message[];
  currentChannel: Room | undefined;
}

// Describing the different ACTION NAMES available
export const SEND_MESSAGE = "SEND_MESSAGE";
export const DELETE_MESSAGE = "DELETE_MESSAGE";
export const JOIN_CONVERSATION = "JOIN_CONVERSATION";

interface SendMessageAction {
  type: typeof SEND_MESSAGE;
  payload: Message;
}

interface DeleteMessageAction {
  type: typeof DELETE_MESSAGE;
  meta: {
    timestamp: number;
  };
}

interface SetCurrentChannel {
  type: typeof JOIN_CONVERSATION;
  payload: Room;
}
export type ChatActionTypes =
  | SendMessageAction
  | DeleteMessageAction
  | SetCurrentChannel;
