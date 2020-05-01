import React, { useEffect, useState } from "react";
import Main from "../components/Main/Main";
import { useParams } from "react-router-dom";
import { getProjectByKey, Project as ProjectTypes } from "../utils/API/project_API";

const Project = () => {
  const { id } = useParams();
  const [project, setProject] = useState<ProjectTypes>();
  useEffect(() => {
    const fetchProject = async () => {
      const { success, data } = await getProjectByKey(id);
      if (success) {
        setProject(data);
      }
    };
    fetchProject();
  }, []);
  return (
    <Main>
      Single Project {id} {project?.name}
    </Main>
  );
};

export default Project;
