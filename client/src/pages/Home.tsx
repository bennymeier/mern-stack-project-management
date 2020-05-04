import React from "react";
import { AppState } from "../redux";
import { connect } from "react-redux";
import Main from "../components/Main/Main";
import { User } from "../utils/API/user_API";
import AvatarUpload from "../components/User/AvatarUpload";

export interface HomeProps {
  currentUser: User;
}
const Home: React.FC<HomeProps> = (props) => {
  const { currentUser } = props;

  return (
    <Main>
      <h4>
        <b>Hey there,</b> {currentUser.firstname}
        <p>You are logged in!</p>
      </h4>
      <AvatarUpload />
    </Main>
  );
};

const mapStateToProps = (state: AppState) => ({
  currentUser: state.auth.user,
});

export default connect(mapStateToProps)(Home);
