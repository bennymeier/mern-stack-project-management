import React, { useEffect, useState } from "react";
import {
  getMessages,
  Message,
  deleteMessage as deleteMsg,
} from "../../../utils/API";
import moment from "moment";
import "./style.css";

const Show = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [callbackMessage, setCallbackMessage] = useState("");
  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await getMessages();
      setMessages(data);
    };
    fetchMessages();
  }, []);

  const deleteMessage = async (messageId: string) => {
    const { success } = await deleteMsg(messageId);
    if (success) {
      const newMessages = messages.filter(
        (message) => message._id !== messageId
      );
      setMessages(newMessages);
      setCallbackMessage("Successfully deleted message.");
    }
  };

  return (
    <div className="messages">
      <p>{callbackMessage}</p>
      {messages.map((message) => {
        const { _id, body, from, conversationId, createdAt } = message;
        const formattedTime = moment(createdAt).format("llll");
        return (
          <div className="message" key={_id} onClick={() => deleteMessage(_id)}>
            <div className="from">{from}</div>
            <p className="body">{body}</p>
            <div className="conversations-id">{conversationId}</div>
            <time className="created-at" dateTime={createdAt}>
              {formattedTime}
            </time>
          </div>
        );
      })}
    </div>
  );
};
export default Show;
