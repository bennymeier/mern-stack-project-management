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

const Project = () => {
  const { id } = useParams();
  const [project, setProject] = useState<ProjectTypes>();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProject = async () => {
      const { success, data } = await getProjectByKey(id);
      if (success) {
        setLoading(false);
        setProject(data);
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

export default Project;
