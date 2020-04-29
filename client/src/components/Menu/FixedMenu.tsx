import React, { useState, useEffect } from "react";
import { Dropdown, Menu, Button } from "semantic-ui-react";
import { routes } from "../../utils/routes";
import { Link, withRouter } from "react-router-dom";
import CreateModal from "../Projects/CreateModal";

const FixedMenu: React.FC<any> = (props) => {
  const { location } = props;
  const { pathname } = location;
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <CreateModal isOpen={isOpen} handleClose={() => setOpen(false)} />
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
            <Dropdown.Item onClick={() => setOpen(!isOpen)}>
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

        <Button color="blue" size="medium">
          Create
        </Button>

        <Menu.Menu position="right">
          <Dropdown item text="Username">
            <Dropdown.Menu>
              <Dropdown.Item>Personal Settings</Dropdown.Item>
              <Dropdown.Divider></Dropdown.Divider>
              <Dropdown.Header>Username</Dropdown.Header>
              <Dropdown.Item>Profile</Dropdown.Item>
              <Dropdown.Item>Account Settings</Dropdown.Item>
              <Dropdown.Divider></Dropdown.Divider>
              <Dropdown.Item>Log out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
    </>
  );
};

export default withRouter(FixedMenu);
