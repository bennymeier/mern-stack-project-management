import React, { useEffect, useState } from "react";
import { AppState } from "../../redux";
import {
  Room,
  Message as MessageType,
  getMessages,
  DeleteMessage,
} from "../../utils/API";
import { connect } from "react-redux";
import Message from "../Message/Show/Message";

export interface RoomMainProps {
  currentChannel?: Room;
}
const RoomMain: React.FC<RoomMainProps> = (props) => {
  const { currentChannel } = props;
  const [messages, setMessages] = useState<MessageType[]>([]);

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
      setMessages(data);
    }
  };

  return (
    <div>
      {messages.map((message) => (
        <Message
          message={message}
          deleteCallback={handleDelete}
          key={message._id}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  currentChannel: state.chat.currentChannel,
});
export default connect(mapStateToProps)(RoomMain);
