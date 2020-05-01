import React from "react";
import { AppState } from "../redux";
import { connect } from "react-redux";
import { logoutUser } from "../redux/auth/actions";
import Main from "../components/Main/Main";
import { User } from "../utils/API/user_API";
import AvatarUpload from "../components/User/AvatarUpload";

export interface HomeProps {
  logoutUser: any;
  currentUser: User;
}
const Home: React.FC<HomeProps> = (props) => {
  const { currentUser, logoutUser } = props;
  const onLogoutClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    props.logoutUser();
  };

  return (
    <Main>
      <h4>
        <b>Hey there,</b> {currentUser.firstname}
        <p>You are logged in!</p>
      </h4>
      <AvatarUpload />
      <button
        onClick={onLogoutClick}
        style={{ position: "fixed", bottom: 100 }}
      >
        Logout
      </button>
    </Main>
  );
};

const mapStateToProps = (state: AppState) => ({
  currentUser: state.auth.user as User,
});

export default connect(mapStateToProps, { logoutUser })(Home);
