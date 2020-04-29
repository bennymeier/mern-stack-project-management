import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Main from "../Main";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/auth/actions";
import { AppState } from "../../redux";
import { UserData } from "../types";
export interface HomeProps {
  logoutUser: any;
  currentUser: UserData;
}
class Home extends React.Component<HomeProps, {}> {
  onLogoutClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { currentUser } = this.props;

    return (
      <>
        <Sidebar />
        <Main>
          <div style={{ height: "75vh" }}>
            <div>
              <div>
                <h4>
                  <b>Hey there,</b> {currentUser.firstname}
                  <p>You are logged in!</p>
                </h4>
                <button onClick={this.onLogoutClick}>Logout</button>
              </div>
            </div>
          </div>
        </Main>
      </>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  currentUser: state.auth.user as UserData,
});

export default connect(mapStateToProps, { logoutUser })(Home);
