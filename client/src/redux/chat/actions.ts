import { Message, SEND_MESSAGE, DELETE_MESSAGE, JOIN_CONVERSATION } from "./types";

export const joinConversation = (conversationsId: string) => {
  return {
    type: JOIN_CONVERSATION,
    payload: conversationsId
  }
}

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
