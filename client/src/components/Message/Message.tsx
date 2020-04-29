import React from "react";
import {
  Message as MessageType,
  deleteMessage,
  DeleteMessage,
} from "../../utils/API";
import moment from "moment";
import "./style.css";
import { UserData } from "../types";

export interface MessageProps {
  style?: React.CSSProperties;
  message: MessageType;
  currentUser: UserData;
  deleteCallback?: (response: DeleteMessage) => void;
}
const Message: React.FC<MessageProps> = (props) => {
  const { message, deleteCallback, currentUser, style } = props;
  const { _id, body, from, createdAt } = message;
  const formattedTime = moment(createdAt).format("llll");

  const handleDelete = async () => {
    const response = await deleteMessage(_id);
    if (deleteCallback) {
      deleteCallback(response);
    }
  };

  return (
    <div className="message" style={{ ...style }}>
      <div className="contents">
        <img
          src={`https://eu.ui-avatars.com/api/?name=${currentUser.firstname}`}
          className="avatar"
          alt=""
        />
        <h2 className="header">
          <span className="username">{from}</span>
          <span className="timestamp">
            <time dateTime={createdAt}>{formattedTime}</time>
          </span>
        </h2>
        <div className="content">
          <p>{body}</p>
        </div>
      </div>
    </div>
  );
};
export default Message;
