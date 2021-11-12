import React, { useState } from "react";
import { Dropdown, Menu, Button } from "semantic-ui-react";
import { routes } from "../../utils/routes";
import { Link, useLocation } from "react-router-dom";
import CreateProjectModal from "../Project/CreateModal";
import CreateIssueModal from "../Issue/CreateModal";
import { connect } from "react-redux";
import { AppState } from "../../redux";
import { User } from "../../utils/API/user_API";
import { logoutUser } from "../../redux/auth/actions";

export interface FixedMenuProps {
  currentUser?: User;
  logoutUser?: typeof logoutUser;
}
const FixedMenu: React.FC<FixedMenuProps> = (props) => {
  const { currentUser, logoutUser } = props;
  const location = useLocation();
  const { pathname } = location;

  const [isProjectOpen, setProjectOpen] = useState(false);
  const [isIssueOpen, setIssueOpen] = useState(false);

  return (
    <>
      <CreateProjectModal
        isOpen={isProjectOpen}
        handleClose={() => setProjectOpen(false)}
        currentUser={currentUser}
      />
      {isIssueOpen && (
        <CreateIssueModal
          isOpen={isIssueOpen}
          handleClose={() => setIssueOpen(false)}
          currentUser={currentUser}
        />
      )}
      <Menu fixed="top" inverted>
        <Menu.Item
          as={Link}
          to={routes["HOME"]}
          active={pathname === routes["HOME"]}
          header
        >
          Project Management
        </Menu.Item>
        <Menu.Item
          as={Link}
          to={routes["YOUR_WORK"]}
          active={pathname === routes["YOUR_WORK"]}
        >
          Your work
        </Menu.Item>
        <Dropdown item text="Projects">
          <Dropdown.Menu>
            <Dropdown.Item
              as={Link}
              to={routes["PROJECTS"]}
              active={pathname === routes["PROJECTS"]}
            >
              View all projects
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setProjectOpen(!isProjectOpen)}>
              Create project
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Item
          as={Link}
          to={routes["DASHBOARDS"]}
          active={pathname === routes["DASHBOARDS"]}
        >
          Dashboards
        </Menu.Item>
        <Menu.Item
          as={Link}
          to={routes["PEOPLE"]}
          active={pathname === routes["PEOPLE"]}
        >
          People
        </Menu.Item>

        <Button
          color="blue"
          size="medium"
          onClick={() => setIssueOpen(!isIssueOpen)}
        >
          Create
        </Button>

        <Menu.Menu position="right">
          <Dropdown item text={currentUser?.firstname}>
            <Dropdown.Menu>
              <Dropdown.Item>Personal Settings</Dropdown.Item>
              <Dropdown.Divider></Dropdown.Divider>
              <Dropdown.Header>
                {currentUser.firstname} {currentUser?.lastname}
              </Dropdown.Header>
              <Dropdown.Item>Profile</Dropdown.Item>
              <Dropdown.Item>Account Settings</Dropdown.Item>
              <Dropdown.Divider></Dropdown.Divider>
              <Dropdown.Item onClick={logoutUser}>Log out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
    </>
  );
};
const mapStateToProps = (state: AppState) => ({
  currentUser: state.auth.user,
});
export default connect(mapStateToProps, { logoutUser })(FixedMenu);
