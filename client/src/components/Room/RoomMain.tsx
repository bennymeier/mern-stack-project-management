import React, { useEffect, useState } from "react";
import { AppState } from "../../redux";
import {
  Room,
  Message as MessageType,
  getMessages,
  DeleteMessage,
  createMessage,
} from "../../utils/API";
import { Form } from "semantic-ui-react";
import { connect } from "react-redux";
import { UserData } from "../types";
import Messages from "../Message/Messages";

export interface RoomMainProps {
  currentChannel?: Room;
  currentUser?: UserData;
}
const RoomMain: React.FC<RoomMainProps> = (props) => {
  const { currentChannel, currentUser } = props;
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, success } = await getMessages((currentChannel as Room)._id);
      if (success) {
        setMessages(data);
        console.log(data);
      }
    };
    if (currentChannel) {
      fetchMessages();
    }
  }, [currentChannel]);

  const handleDelete = (response: DeleteMessage) => {
    const { success, data } = response;
    if (success) {
      const updatedMessages = messages.filter(
        (message) => message._id !== data._id
      );
      setMessages(updatedMessages);
    }
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    data: any
  ) => {
    const { _id } = currentChannel as Room;
    const { email } = currentUser as UserData;
    event.preventDefault();
    const send = await createMessage({
      body: message,
      to: _id,
      from: email,
    });
    const { message: cbMessage, success, data: cbData } = send;
    if (success) {
      setMessages([...messages, cbData]);
      setMessage("");
    } else {
      console.error(cbMessage);
    }
  };
  const handleChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    setMessage(event.currentTarget.value);
  };
  return (
    <div className="chat-content">
      <main className="main-chat-content">
        <div className="chat-wrapper" id="chat-wrapper">
          <Messages
            currentChannel={currentChannel as Room}
            currentUser={currentUser as UserData}
            messages={messages}
          />
        </div>
        <Form className="form" onSubmit={handleSubmit}>
          <div className="textarea">
            <Form.TextArea
              id="message"
              placeholder={`Message to #${currentChannel?.name}`}
              onChange={handleChange}
              value={message}
            />
            <Form.Button type="submit" fluid>
              Submit
            </Form.Button>
          </div>
        </Form>
      </main>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  currentChannel: state.chat.currentChannel,
  currentUser: state.auth.user,
});
export default connect(mapStateToProps)(RoomMain);
