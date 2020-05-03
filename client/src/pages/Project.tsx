import React, { useEffect, useState } from "react";
import Main from "../components/Main/Main";
import { useParams } from "react-router-dom";
import {
  getProjectByKey,
  Project as ProjectTypes,
} from "../utils/API/project_API";
import ProjectBreadcrumb from "../components/Breadcrumb/ProjectBreadcrumb";
import ProjectHeader from "../components/Project/ProjectHeader";
import ProjectContent from "../components/Project/ProjectContent";
import { connect } from "react-redux";
import { setCurrentProject } from "../redux/project/actions";

export interface ProjectProps {
  setCurrentProject: typeof setCurrentProject;
}
const Project: React.FC<ProjectProps> = (props) => {
  const { setCurrentProject } = props;
  const { id } = useParams();
  const [project, setProject] = useState<ProjectTypes>();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProject = async () => {
      const { success, data } = await getProjectByKey(id);
      if (success) {
        setLoading(false);
        setProject(data);
        setCurrentProject(data);
      }
    };
    fetchProject();
  }, []);

  return (
    <Main>
      {!isLoading && project && (
        <>
          <ProjectBreadcrumb name={project.name} projectKey={project.key} />
          <ProjectHeader />
          <ProjectContent />
        </>
      )}
    </Main>
  );
};

export default connect(null, { setCurrentProject })(Project);
