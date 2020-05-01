import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Message, Icon } from "semantic-ui-react";
import { getProjects } from "../../utils/API/project_API";
import { User, getUsers } from "../../utils/API/user_API";
import Select from "react-select";
import { Issue } from "../../utils/API/issue_API";
import { getIssueTypes } from "../../utils/API/issuetype_API";
import { getIssueTypeIcon } from "../../utils/helpers";

export interface CreateModalProps {
  currentUser: User;
  isOpen: boolean;
  handleClose: () => void;
}
const CreateModal: React.FC<CreateModalProps> = (props) => {
  const { isOpen, handleClose, currentUser } = props;
  const [projects, setProjects] = useState<any>([]);
  const [projectId, setProjectId] = useState("");
  const [issueTypeId, setIssueTypeId] = useState("");
  const [issueTypes, setIssueTypes] = useState<any>([]);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [assigneeId, setAssigneeId] = useState("");
  const [assignees, setAssignees] = useState<any>([]);
  const [priorityId, setPriorityId] = useState("");
  const [priorities, setPriorites] = useState([]);
  const [epicId, setEpicId] = useState("");
  const [epics, setEpics] = useState([]);
  const [projectsAreLoading, setProjectsLoading] = useState(true);
  const [issueTypesAreLoading, setIssueTypesLoading] = useState(true);
  const [assigneesAreLoading, setAssigneesLoading] = useState(true);
  const [prioritiesAreLoading, setPrioritiesLoading] = useState(true);
  const [epicsAreLoading, setEpicsLoading] = useState(false);
  const [error, setError] = useState(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, success } = await getProjects();
      setProjectsLoading(false);
      if (success) {
        const prepareData = data.map((project) => {
          return {
            value: project.key,
            label: `${project.name} (${project.key})`,
          };
        });
        setProjects(prepareData);
      }
    };
    fetchProjects();

    const fetchIssueTypes = async () => {
      const { data, success } = await getIssueTypes();
      setIssueTypesLoading(false);
      if (success) {
        const prepareData = data.map((issueType) => {
          const issueIcon: any = getIssueTypeIcon(issueType.id);
          return {
            value: issueType.id,
            label: (
              <>
                <Icon name={issueIcon.name} color={issueIcon.color} />
                {issueType.label}
              </>
            ),
          };
        });
        setIssueTypes(prepareData);
      }
    };
    fetchIssueTypes();

    const fetchAssignees = async () => {
      const { data, success } = await getUsers();
      setAssigneesLoading(false);
      if (success) {
        const prepareData = data.map((user) => {
          return {
            value: user.email,
            label: (
              <>
                {user.firstname} {user.lastname || ""}
              </>
            ),
          };
        });
        setAssignees(prepareData);
      }
    };
    fetchAssignees();
  }, [isOpen]);

  const ProjectSelect = () => (
    <Select
      isLoading={projectsAreLoading}
      isClearable
      isSearchable
      name="project"
      id="project"
      defaultValue={projects[0]}
      options={projects}
    />
  );

  const IssueTypeSelect = () => (
    <Select
      isLoading={issueTypesAreLoading}
      isClearable
      isSearchable
      name="issueType"
      id="issueType"
      defaultValue={issueTypes[0]}
      options={issueTypes}
    />
  );

  const AssigneeSelect = () => (
    <Select
      isLoading={assigneesAreLoading}
      isClearable
      isSearchable
      name="assignee"
      id="assignee"
      defaultValue={assignees[0]}
      options={assignees}
    />
  );

  return (
    <Modal open={isOpen} size="large" centered>
      <Modal.Header>Create issue</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form onSubmit={handleSubmit}>
            <Form.Field
              control={ProjectSelect}
              label="Project"
              required
              width="4"
            />
            <Form.Field
              control={IssueTypeSelect}
              label="Issue Type"
              required
              width="4"
            />
            <Form.Input
              fluid
              onChange={(event) => setSummary(event.target.value)}
              label="Summary"
              required
              value={summary}
            />
            <Form.TextArea
              onChange={(_, { value }) => setDescription(value as string)}
              label="Description"
              value={description}
            />
            <Form.Field control={AssigneeSelect} label="Assignee" width="6" />
            <Message
              error
              header="Project could not be created"
              visible={error}
            />
            <Button color="green" type="submit" floated="right" className="mb">
              Create
            </Button>
          </Form>
          <Button basic color="red" onClick={() => handleClose()}>
            Cancel
          </Button>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default CreateModal;
