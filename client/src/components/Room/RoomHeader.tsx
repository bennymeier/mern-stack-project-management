import React from "react";
import { AppState } from "../../redux";
import { connect } from "react-redux";
import { Room } from "../../utils/API";
import { Icon, Dropdown, Menu, Label, Image } from "semantic-ui-react";
import { UserData } from "../types";
import { logoutUser } from "../../redux/auth/actions";

export interface RoomHeaderProps {
  currentChannel: Room;
  currentUser: UserData;
  logoutUser: any;
}
export type MenuItems =
  | "user-status"
  | "user-status-text"
  | "settings"
  | "logout";

const RoomHeader: React.FC<RoomHeaderProps> = (props) => {
  const { currentChannel, currentUser, logoutUser } = props;
  const handleItemClick = (
    event?: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    data?: MenuItems
  ) => {};

  const trigger = (
    <span>
      <Image
        avatar
        src={`https://eu.ui-avatars.com/api/?name=${currentUser.firstname}`}
      />{" "}
      {currentUser?.firstname}
    </span>
  );

  return (
    <section className="chat-header">
      <div className="icon-wrapper">
        <Icon name="hashtag" size="large" />
      </div>
      <h3 className="title">{currentChannel?.name}</h3>
      <div className="left"></div>
      <div className="right">
        <Dropdown trigger={trigger}>
          <Dropdown.Menu style={{ minWidth: 350 }}>
            <Dropdown.Item>
              <div>Teeest</div>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </section>
  );
};
const mapStateToProps = (state: AppState) => ({
  currentUser: state.auth.user as UserData,
  currentChannel: state.chat.currentChannel as Room,
});
export default connect(mapStateToProps, { logoutUser })(RoomHeader);
