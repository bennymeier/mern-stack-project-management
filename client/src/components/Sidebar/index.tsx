import React, { useEffect, useState } from "react";
import "./style.css";
import { getRooms, Room } from "../../utils/API";
import { connect } from "react-redux";
import { joinConversation } from "../../redux/chat/actions";
import { ChatState } from "../../redux/chat/types";
import { AppState } from "../../redux";

export interface SidebarProps {
  joinConversation: typeof joinConversation;
  chat: ChatState;
}
const Sidebar: React.FC<SidebarProps> = (props) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  useEffect(() => {
    const fetchRooms = async () => {
      const rooms = await getRooms();
      const { data, success } = rooms;
      if (success) {
        setRooms(data);
      }
    };
    fetchRooms();
  }, []);
  const join = (conversationId: string) => {
    props.joinConversation(conversationId);
  };
  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <div className="chat-name">Chatlify</div>
      </div>
      <div className="sidebar-conversations">
        <ul>
          {!!rooms.length &&
            rooms.map((room) => {
              const { _id, name } = room;
              return (
                <li key={_id} onClick={() => join(_id)}>
                  <a href="#">{name}</a>
                </li>
              );
            })}
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = (state: AppState) => ({
  chat: state.chat,
});

export default connect(mapStateToProps, { joinConversation })(Sidebar);
