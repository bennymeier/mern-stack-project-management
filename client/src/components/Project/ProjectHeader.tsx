import React, { useState } from "react";
import { Icon, Dropdown, Confirm } from "semantic-ui-react";
import {
  deleteProject as deleteProjectAPI,
  Project,
} from "../../utils/API/project_API";
import { routes } from "../../utils/routes";
import { useNavigate } from "react-router-dom";

export interface ProjectHeaderProps {
  project: Project;
}
const ProjectHeader: React.FC<ProjectHeaderProps> = (props) => {
  const { project } = props;
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const deleteProject = async () => {
    const { success } = await deleteProjectAPI(project._id);
    if (success) {
      navigate(routes.PROJECTS);
    }
  };
  return (
    <>
      <Confirm
        content={`Are you sure you want to delete ${project.name}?`}
        open={isOpen}
        onCancel={() => setOpen(false)}
        onConfirm={deleteProject}
      />
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
              <Dropdown.Item
                text="Delete Board"
                onClick={() => setOpen(true)}
              />
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </>
  );
};

export default ProjectHeader;
