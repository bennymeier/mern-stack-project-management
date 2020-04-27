import {
  ChatState,
  SEND_MESSAGE,
  DELETE_MESSAGE,
  ChatActionTypes,
  JOIN_CONVERSATION,
} from "./types";

const initialState: ChatState = {
  messages: [],
  currentChannel: undefined,
};

export const chatReducer = (
  state = initialState,
  action: ChatActionTypes
): ChatState => {
  switch (action.type) {
    case SEND_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case DELETE_MESSAGE:
      return {
        ...state,
        messages: state.messages.filter(
          (message) => message.timestamp !== action.meta.timestamp
        ),
      };
    case JOIN_CONVERSATION:
      return {
        ...state,
        currentChannel: action.payload,
      };
    default:
      return state;
  }
};
