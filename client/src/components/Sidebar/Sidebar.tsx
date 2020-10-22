import React, { useEffect, useState } from "react";
import "./style.css";
import { getRooms, Room } from "../../utils/API/API";
import { connect } from "react-redux";
import { setCurrentChannel } from "../../redux/chat/actions";
import { ChatState } from "../../redux/chat/types";
import { AppState } from "../../redux";
import { Link } from "react-router-dom";
import UserProfile from "./SidebarProfile";
import { Icon, List } from "semantic-ui-react";
import { useParams } from "react-router-dom";

export interface SidebarProps {
  setCurrentChannel: typeof setCurrentChannel;
  chat: ChatState;
}
const Sidebar: React.FC<SidebarProps> = (props) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  // @ts-ignore
  const { id: currentRoomId } = useParams();

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
    <div className="sidebar">
      <nav className="container">
        <div className="sidebar-header">
          <header className="header">
            <h1 className="chat-name">Chatlify</h1>
            <Icon name="arrow down" />
          </header>
        </div>
        <UserProfile />
        <div className="sidebar-conversations">
          <List>
            {!!rooms.length &&
              rooms.map((room) => {
                const { _id, name } = room;
                return (
                  <Link
                    to={`/room/${_id}`}
                    onClick={() => join(room)}
                    key={_id}
                  >
                    <List.Item
                      className={_id === currentRoomId ? "selected" : ""}
                    >
                      <div className="content">
                        <Icon name="hashtag" />
                        <div className="name">{name}</div>
                        <div className="unread">
                          <div className="unread-badge">
                            <div className="unread-badge-number">5</div>
                          </div>
                        </div>
                      </div>
                    </List.Item>
                  </Link>
                );
              })}
          </List>
        </div>
      </nav>
      <section className="user-panel">Benny</section>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  chat: state.chat,
});

export default connect(mapStateToProps, { setCurrentChannel })(Sidebar);
