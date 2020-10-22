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
import { getIssueTypes } from "../utils/API/issuetype_API";
import { setIssueTypes } from "../redux/issuetype/actions";
import { setKanbanTypes } from "../redux/kanbantype/actions";
import { getKanbanTypes } from "../utils/API/kanbantype_API";
import { getPriorities } from "../utils/API/priority_API";
import { setPriorities } from "../redux/priority/actions";

export interface ProjectProps {
  setCurrentProject: typeof setCurrentProject;
  setIssueTypes: typeof setIssueTypes;
  setKanbanTypes: typeof setKanbanTypes;
  setPriorities: typeof setPriorities;
}
const Project: React.FC<ProjectProps> = (props) => {
  const {
    setCurrentProject,
    setIssueTypes,
    setKanbanTypes,
    setPriorities,
  } = props;
  // @ts-ignore
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

    const fetchIssueTypes = async () => {
      const { success, data } = await getIssueTypes();
      if (success) {
        setIssueTypes(data);
      }
    };
    fetchIssueTypes();

    const fetchKanbanTypes = async () => {
      const { success, data } = await getKanbanTypes();
      if (success) {
        setKanbanTypes(data);
      }
    };
    fetchKanbanTypes();

    const fetchPriorities = async () => {
      const { success, data } = await getPriorities();
      if (success) {
        setPriorities(data);
      }
    };
    fetchPriorities();
  }, []);

  return (
    <Main>
      {!isLoading && project && (
        <>
          <ProjectBreadcrumb name={project.name} projectKey={project.key} />
          <ProjectHeader project={project}/>
          <ProjectContent />
        </>
      )}
    </Main>
  );
};

export default connect(null, {
  setCurrentProject,
  setIssueTypes,
  setKanbanTypes,
  setPriorities,
})(Project);
