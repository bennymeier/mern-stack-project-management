import {
  Message,
  SEND_MESSAGE,
  DELETE_MESSAGE,
  JOIN_CONVERSATION,
} from "./types";
import { Room } from "../../utils/API";

export const setCurrentChannel = (currentChannel: Room) => {
  return {
    type: JOIN_CONVERSATION,
    payload: currentChannel,
  };
};

export const sendMessage = (newMessage: Message) => {
  return {
    type: SEND_MESSAGE,
    payload: newMessage,
  };
};

export const deleteMessage = (timestamp: number) => {
  return {
    type: DELETE_MESSAGE,
    meta: {
      timestamp,
    },
  };
};
