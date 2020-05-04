import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { uploadAvatar, Avatar, deleteAvatar } from "../../utils/API/avatar_API";
import { AppState } from "../../redux";
import { connect } from "react-redux";
import { User } from "../../utils/API/user_API";

export interface AvatarUploadProps {
  currentUser: User;
}
const AvatarUpload: React.FC<AvatarUploadProps> = (props) => {
  const { currentUser } = props;
  const [selectedAvatar, setAvatar] = useState<any>();
  const [avatarData, setAvatarData] = useState<Avatar>();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedAvatar);
    const { data, success } = await uploadAvatar(currentUser._id, formData);
    if (success) {
      setAvatar(null);
      setAvatarData(data);
    }
  };

  const handleDelete = async () => {
    const { success, message } = await deleteAvatar(currentUser._id);
    if (success) {
      console.log(message);
    }
  };
  return (
    <>
      Path: {avatarData?.destination}, Filename: {avatarData?.filename}
      <Form onSubmit={handleSubmit}>
        <Button
          as="label"
          content="Choose Avatar"
          labelPosition="left"
          icon="image"
          htmlFor="avatarupload"
        />
        <input
          id="avatarupload"
          type="file"
          hidden
          onChange={(event) => setAvatar((event.target.files as any)[0])}
        />
        <Button type="submit">Upload</Button>
      </Form>
      <Button color="red" onClick={handleDelete}>
        Delete Avatar
      </Button>
    </>
  );
};
const mapStateToProps = (state: AppState) => ({
  currentUser: state.auth.user,
});
export default connect(mapStateToProps)(AvatarUpload);
