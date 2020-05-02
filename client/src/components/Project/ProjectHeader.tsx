import React from "react";
import { Icon, Dropdown } from "semantic-ui-react";

export interface ProjectHeaderProps {}
const ProjectHeader: React.FC<ProjectHeaderProps> = (props) => {
  return (
    <>
      <div className="project-header">
        <div className="left">
          <h1>Kanban Board</h1>
        </div>
        <div className="right">
          <Icon name="star" color="yellow" />
          <Dropdown
            icon={null}
            trigger={
              <Icon
                name="ellipsis horizontal"
                size="big"
                style={{ lineHeight: "unset" }}
              />
            }
            pointing="top right"
          >
            <Dropdown.Menu>
              <Dropdown.Item text="Board Settings" />
              <Dropdown.Item text="Create Board" />
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </>
  );
};

export default ProjectHeader;
