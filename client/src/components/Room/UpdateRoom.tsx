import React, { useEffect, useState } from "react";
import "./style.css";
import { updateRoom, Room, getRooms } from "../../utils/API";

const UpdateRoom = () => {
	const [ name, setName ] = useState("");
	const [ description, setDescription ] = useState("");
	const [ members, setMembers ] = useState<string[]>([]);
    const [ room, setRoom ] = useState<Room>();
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
        const updateObj = { name, description, members };
        if (room?._id) {
            await updateRoom(room._id, updateObj);
        }
    };
	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="name">
				Name:F
				<input
					type="text"
					value={name}
					name="name"
					id="name"
					onChange={(event) => setName(event.target.value)}
				/>
			</label>
			<label htmlFor="description">
				Description:
				<input
					type="text"
					value={description}
					name="description"
					id="description"
					onChange={(event) => setDescription(event.target.value)}
				/>
			</label>
			<label htmlFor="members">
				Members:
				<input
					type="text"
					value={members}
					name="members"
					id="members"
					onChange={(event) => setMembers([ event.target.value ])}
				/>
			</label>
			<input type="submit" value="Submit" />
		</form>
	);
};

export default UpdateRoom;
