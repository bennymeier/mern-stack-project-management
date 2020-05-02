import React from "react";
import { Button } from "semantic-ui-react";
import ProjectSearch from "./Search";
import Swimlane from "../Kanban/Swimlane";

export interface ProjectContentProps {}
const ProjectContent: React.FC<ProjectContentProps> = (props) => {
  return (
    <>
      <div className="project-content">
        <ul className="list">
          <li>
            <ProjectSearch />
          </li>
          <li>
            <Button>Only My Issues</Button>
          </li>
          <li>
            <Button>Recently Updated</Button>
          </li>
        </ul>
        <Swimlane />
      </div>
    </>
  );
};

export default ProjectContent;
