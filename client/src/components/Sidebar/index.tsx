import React, { useEffect, useState } from "react";
import "./style.css";
import { getRooms, Room } from "../../utils/API";
import { connect } from "react-redux";
import { setCurrentChannel } from "../../redux/chat/actions";
import { ChatState } from "../../redux/chat/types";
import { AppState } from "../../redux";
import { Link } from "react-router-dom";
import UserProfile from "./UserProfile";

export interface SidebarProps {
  setCurrentChannel: typeof setCurrentChannel;
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
  const join = (currentChannel: Room) => {
    props.setCurrentChannel(currentChannel);
  };
  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <div className="chat-name">Chatlify</div>
      </div>
      <UserProfile />
      <div className="sidebar-conversations">
        <ul>
          {!!rooms.length &&
            rooms.map((room) => {
              const { _id, name } = room;
              return (
                <li key={_id} onClick={() => join(room)}>
                  <Link to={`/room/${_id}`}>{name}</Link>
                </li>
              );
            })}
        </ul>
      </div>
      <div className="sidebar-start-conversation">
        <button>Start conversation</button>
      </div>
    </nav>
  );
};

const mapStateToProps = (state: AppState) => ({
  chat: state.chat,
});

export default connect(mapStateToProps, { setCurrentChannel })(Sidebar);
