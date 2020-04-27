import React from "react";
import { AppState } from "../../redux";
import { connect } from "react-redux";
import { Room } from "../../utils/API";

export interface RoomHeaderProps {
  currentChannel?: Room;
}
const RoomHeader: React.FC<RoomHeaderProps> = (props) => {
  const { currentChannel } = props;

  return <div>{currentChannel?.name}</div>;
};
const mapStateToProps = (state: AppState) => ({
  currentChannel: state.chat.currentChannel,
});
export default connect(mapStateToProps)(RoomHeader);
