import React from "react";
import { connect } from "react-redux";
import { AppState } from "../../redux";
import { UserData } from "../types";
export interface UserProfileProps {
  currentUser: UserData;
}
const UserProfile: React.FC<UserProfileProps> = (props) => {
  const { currentUser } = props;
  return (
    <div className="sidebar-profile">
      <div className="user-pic">
        <img
          src={`https://eu.ui-avatars.com/api/?name=${currentUser.firstname}${
            currentUser.lastname ? "+" + currentUser.lastname : ""
          }`}
          alt=""
        />
      </div>
      <div className="user-info">
        <span className="user-name">
          <strong>{currentUser.firstname}</strong> {currentUser.lastname}
        </span>
        <span className="user-role">{currentUser.role}</span>
        <span className="user-status">{currentUser.status}</span>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  currentUser: state.auth.user as UserData,
});
export default connect(mapStateToProps)(UserProfile);
