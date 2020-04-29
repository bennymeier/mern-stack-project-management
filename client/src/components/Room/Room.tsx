import React, { useEffect, useState } from "react";
import RoomHeader from "./RoomHeader";
import RoomMain from "./RoomMain";
import RoomFooter from "./RoomFooter";
import { useParams } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Main from "../Main";
import { useHistory } from "react-router-dom";
import { getRoom, Room } from "../../utils/API";
import { AppState } from "../../redux";
import { connect } from "react-redux";
import { setCurrentChannel } from "../../redux/chat/actions";
export interface RoomProps {
  currentChannel?: Room;
  setCurrentChannel: typeof setCurrentChannel;
}
const RoomComponent: React.FC<RoomProps> = (props) => {
  const { currentChannel, setCurrentChannel } = props;
  const { id } = useParams();
  const [, setRoom] = useState<Room | undefined>(currentChannel);
  const history = useHistory();

  useEffect(() => {
    if (!currentChannel) {
      const fetchRoom = async () => {
        const { data, success } = await getRoom(id);
        if (success) {
          setRoom(data);
          setCurrentChannel(data);
        } else {
          history.push("/home");
        }
      };
      fetchRoom();
    } else {
      setRoom(currentChannel);
    }
  }, [id, currentChannel, history, setCurrentChannel]);

  return (
    <>
      <Sidebar />
      <Main>
          <RoomHeader />
          <RoomMain />
          {/* <RoomFooter /> */}
      </Main>
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  currentChannel: state.chat.currentChannel,
});

export default connect(mapStateToProps, { setCurrentChannel })(RoomComponent);
