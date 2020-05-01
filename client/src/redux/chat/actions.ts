import {
  Message,
  SEND_MESSAGE,
  DELETE_MESSAGE,
  JOIN_CONVERSATION,
} from "./types";
import { Room } from "../../utils/API/API";

export const setCurrentChannel = (currentChannel: Room) => {
  return {
    type: JOIN_CONVERSATION,
    payload: currentChannel,
  } as const;
};

export const sendMessage = (newMessage: Message) => {
  return {
    type: SEND_MESSAGE,
    payload: newMessage,
  } as const;
};

export const deleteMessage = (timestamp: number) => {
  return {
    type: DELETE_MESSAGE,
    meta: {
      timestamp,
    },
  } as const;
};
