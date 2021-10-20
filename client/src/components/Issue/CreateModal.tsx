import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Message, Icon } from "semantic-ui-react";
import { getProjects } from "../../utils/API/project_API";
import { User, getUsers } from "../../utils/API/user_API";
import Select from "react-select";
import { Issue, createIssue } from "../../utils/API/issue_API";
import { getIssueTypes } from "../../utils/API/issuetype_API";
import { getPriorities } from "../../utils/API/priority_API";
import { KanbanType, getKanbanTypes } from "../../utils/API/kanbantype_API";

export interface ReactSelectProps {
  value: string;
  label: string | React.ReactNode;
}
export interface CreateModalProps {
  currentUser: User;
  isOpen: boolean;
  handleClose: () => void;
}
const CreateModal: React.FC<CreateModalProps> = (props) => {
  const { isOpen, handleClose, currentUser } = props;
  const [projects, setProjects] = useState<any[]>([]);
  const [projectLabel, setProjectLabel] = useState<ReactSelectProps>();
  const [issueTypeLabel, setIssueTypeLabel] = useState<ReactSelectProps>();
  const [issueTypes, setIssueTypes] = useState<any[]>([]);
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [assigneeLabel, setAssigneeLabel] = useState<ReactSelectProps>();
  const [assignees, setAssignees] = useState<any[]>([]);
  const [priorityLabel, setPriorityLabel] = useState<ReactSelectProps>();
  const [priorities, setPriorites] = useState<any[]>([]);
  const [epicId, setEpicId] = useState("");
  const [epics, setEpics] = useState<any[]>([]);
  const [kanbanTypes, setKanbanTypes] = useState<KanbanType[]>([]);
  const [projectsAreLoading, setProjectsLoading] = useState(true);
  const [issueTypesAreLoading, setIssueTypesLoading] = useState(true);
  const [assigneesAreLoading, setAssigneesLoading] = useState(true);
  const [prioritiesAreLoading, setPrioritiesLoading] = useState(true);
  const [epicsAreLoading, setEpicsLoading] = useState(false);
  const [error, setError] = useState(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const issue: Partial<Issue> = {
      projectId: projectLabel?.value || "",
      creatorId: currentUser._id,
      issueTypeId: issueTypeLabel?.value || "",
      assigneeId: assigneeLabel?.value || "",
      priorityId: priorityLabel?.value || "",
      statusId: kanbanTypes[0]._id,
      epicId,
      summary,
      description,
    };
    const { success } = await createIssue(issue);
    if (success) {
      handleClose();
    } else {
      setError(true);
    }
  };

  const assignMeHandler = () => {
    const me = assignees.find((assignee) => assignee.value === currentUser._id);
    setAssigneeLabel({
      value: me.value,
      label: `${currentUser.firstname} ${currentUser.lastname}`,
    });
  };

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, success } = await getProjects();
      setProjectsLoading(false);
      if (success && data.length) {
        setProjectLabel({
          value: data[0]._id,
          label: `${data[0].name} (${data[0].key})`,
        });
        const prepareData = data.map((project) => {
          return {
            value: project._id,
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
        const issueType = data.find((type) => type.id === "story");
        if (issueType) {
          setIssueTypeLabel({
            value: issueType._id,
            label: (
              <>
                <Icon
                  name={issueType.icon as any}
                  color={issueType.color as any}
                />
                {issueType.label}
              </>
            ),
          });
        }
        const prepareData = data.map((issueType) => {
          return {
            value: issueType._id,
            label: (
              <>
                <Icon
                  name={issueType.icon as any}
                  color={issueType.color as any}
                />
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
            value: user._id,
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

    const fetchPriorities = async () => {
      const { data, success } = await getPriorities();
      setPrioritiesLoading(false);
      if (success) {
        const priority = data.find((prio) => prio.id === "medium");
        if (priority) {
          setPriorityLabel({
            value: priority._id,
            label: (
              <>
                <Icon
                  name={priority.icon as any}
                  color={priority.color as any}
                />
                {priority.label}
              </>
            ),
          });
        }
        const prepareData = data.map((priority) => {
          return {
            value: priority._id,
            label: (
              <>
                <Icon
                  name={priority.icon as any}
                  color={priority.color as any}
                />
                {priority.label}
              </>
            ),
          };
        });
        setPriorites(prepareData);
      }
    };
    fetchPriorities();

    const fetchKanbanTypes = async () => {
      const { data, success } = await getKanbanTypes();
      if (success) {
        setKanbanTypes(data);
      }
    };
    fetchKanbanTypes();
  }, [isOpen]);

  const ProjectSelect = () => (
    <Select
      onChange={(value) => setProjectLabel(value)}
      isLoading={projectsAreLoading}
      isClearable={false}
      isSearchable
      name="project"
      id="project"
      value={projectLabel}
      options={projects}
      placeholder=""
      tabIndex={1}
    />
  );

  const IssueTypeSelect = () => (
    <Select
      onChange={(value) => setIssueTypeLabel(value)}
      isLoading={issueTypesAreLoading}
      isClearable={false}
      isSearchable
      name="issueType"
      id="issueType"
      value={issueTypeLabel}
      options={issueTypes}
      placeholder=""
    />
  );

  const AssigneeSelect = () => (
    <Select
      onChange={(value) => setAssigneeLabel(value)}
      isLoading={assigneesAreLoading}
      isClearable
      isSearchable
      name="assignee"
      id="assignee"
      options={assignees}
      placeholder="Automatic"
      value={assigneeLabel}
    />
  );

  const PrioritySelect = () => (
    <Select
      onChange={(value) => setPriorityLabel(value)}
      value={priorityLabel}
      isLoading={prioritiesAreLoading}
      isClearable={false}
      isSearchable
      name="priority"
      id="priority"
      options={priorities}
      placeholder=""
    />
  );

  const EpicSelect = () => (
    <Select
      onChange={({ value }) => setEpicId(value)}
      isLoading={epicsAreLoading}
      isClearable
      isSearchable
      name="epicLink"
      id="epicLink"
      defaultValue={epics[0]}
      options={epics}
      placeholder=""
    />
  );

  return (
    <Modal open={isOpen} size="large" centered>
      <Modal.Header>Create issue</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form onSubmit={handleSubmit}>
            <Form.Field
              id="project"
              name="project"
              control={ProjectSelect}
              label={{ children: "Project", htmlFor: "project" }}
              required
              width="4"
            />
            <Form.Field
              id="issueType"
              name="issueType"
              control={IssueTypeSelect}
              label="Issue Type"
              required
              width="4"
            />
            <Form.Input
              id="summary"
              name="summary"
              fluid
              onChange={(event) => setSummary(event.target.value)}
              label={{ children: "Summary", htmlFor: "summary" }}
              required
              value={summary}
            />
            <Form.TextArea
              id="description"
              name="description"
              onChange={(_, { value }) => setDescription(value as string)}
              label={{ children: "Description", htmlFor: "description" }}
              value={description}
              rows="8"
            />
            <Form.Field
              id="assignee"
              name="assignee"
              control={AssigneeSelect}
              label={{ children: "Assignee", htmlFor: "assignee" }}
              width="6"
            />
            <Button onClick={assignMeHandler} type="button" size="mini">
              Assign to me
            </Button>
            <Form.Field
              id="priority"
              name="priority"
              control={PrioritySelect}
              label={{ children: "Priority", htmlFor: "priority" }}
              width="3"
            />
            <Form.Field
              id="epicLink"
              name="epicLink"
              control={EpicSelect}
              label={{ children: "Epic Link", htmlFor: "epicLink" }}
              width="6"
            />

            <Message
              error
              header="Issue could not be created"
              visible={error}
            />
            <Button color="green" type="submit" floated="right" className="mb">
              Create
            </Button>
          </Form>
          <Button basic color="red" onClick={() => handleClose()} type="button">
            Cancel
          </Button>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default CreateModal;
