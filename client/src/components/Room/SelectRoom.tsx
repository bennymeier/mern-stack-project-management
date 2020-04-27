import React, { useEffect, useState } from "react";
import { getRooms, Room } from "../../utils/API";
import { setCurrentChannel } from "../../redux/chat/actions";
import { connect } from "react-redux";
export interface SelectRoomProps {
  setCurrentChannel: typeof setCurrentChannel;
}
const SelectRoom: React.FC<SelectRoomProps> = (props) => {
  const { setCurrentChannel } = props;
  const [rooms, setRooms] = useState<Room[]>([]);
  const [room, setRoom] = useState<Room>();
  const joinRoom = (room: Room) => {
    setRoom(room);
    setCurrentChannel(room);
  };
  useEffect(() => {
    const fetchRooms = async () => {
      const { data, success } = await getRooms();
      if (success) {
        setRooms(data);
      }
    };
    fetchRooms();
  }, []);

  return (
    <>
      <h4>
        Selected Room: {room?.name} ({room?._id}){" "}
      </h4>
      <ul>
        {!!rooms.length &&
          rooms.map((room) => {
            return (
              <li onClick={() => joinRoom(room)} key={room._id}>
                {room.name}
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default connect(null, { setCurrentChannel })(SelectRoom);
