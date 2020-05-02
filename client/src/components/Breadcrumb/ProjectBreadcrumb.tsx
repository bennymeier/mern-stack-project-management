import React from "react";
import { Breadcrumb } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { routes } from "../../utils/routes";

export interface ProjectBreadcrumbProps {
  name: string;
  projectKey: string;
}
const ProjectBreadcrumb: React.FC<ProjectBreadcrumbProps> = (props) => {
  const { name, projectKey: key } = props;
  return (
    <Breadcrumb>
      <Breadcrumb.Section link as={Link} to={routes.PROJECTS}>
        Projects
      </Breadcrumb.Section>
      <Breadcrumb.Divider />
      <Breadcrumb.Section link as={Link} to={`${routes.PROJECTS}/${key}`}>
        {name}
      </Breadcrumb.Section>
      <Breadcrumb.Divider />
      <Breadcrumb.Section>{key} Board</Breadcrumb.Section>
    </Breadcrumb>
  );
};

export default ProjectBreadcrumb;
