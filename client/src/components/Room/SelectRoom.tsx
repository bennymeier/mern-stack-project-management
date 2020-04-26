import React, { useEffect, useState } from "react";
import { getRooms, Room } from "../../utils/API";

const SelectRoom = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [room, setRoom] = useState<Room>();
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
              <li onClick={() => setRoom(room)} key={room._id}>
                {room.name}
              </li>
            );
          })}
      </ul>
    </>
  );
};
export default SelectRoom;
