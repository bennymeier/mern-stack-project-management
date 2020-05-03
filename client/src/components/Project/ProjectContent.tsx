import React, { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import ProjectSearch from "./Search";
import Swimlane from "../Kanban/Swimlane";

export interface ProjectContentProps {}
const ProjectContent: React.FC<ProjectContentProps> = () => {
  const [filterMyIssues, setFilterMyIssues] = useState<boolean>();
  useEffect(() => setFilterMyIssues(filterMyIssues), [filterMyIssues]);
  return (
    <>
      <div className="project-content">
        <ul className="list">
          <li>
            <ProjectSearch />
          </li>
          <li>
            <Button
              onClick={() =>
                // @ts-ignore
                setFilterMyIssues(!filterMyIssues) ||
                console.log(!filterMyIssues)
              }
            >
              Only My Issues
            </Button>
          </li>
          <li>
            <Button>Recently Updated</Button>
          </li>
        </ul>
        <Swimlane filterMyIssues={filterMyIssues} />
      </div>
    </>
  );
};
export default ProjectContent;
