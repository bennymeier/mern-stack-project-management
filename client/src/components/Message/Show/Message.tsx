import React from "react";
import { Message as MessageType, deleteMessage, DeleteMessage } from "../../../utils/API";
import moment from "moment";
import "./style.css";
export interface MessageProps {
  message: MessageType;
  deleteCallback?: (response: DeleteMessage) => void;
}
const Message: React.FC<MessageProps> = (props) => {
  const { message, deleteCallback } = props;
  const { _id, body, from, conversationId, createdAt } = message;
  const formattedTime = moment(createdAt).format("llll");

  const handleDelete = async () => {
    const response = await deleteMessage(_id);
    if (deleteCallback) {
      deleteCallback(response);
    }
  };

  return (
    <div className="message" key={_id}>
      <div className="from">{from}</div>
      <p className="body">{body}</p>
      <div className="conversations-id">{conversationId}</div>
      <time className="created-at" dateTime={createdAt}>
        {formattedTime}
      </time>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};
export default Message;
