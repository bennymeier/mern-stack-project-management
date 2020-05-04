import React from "react";
import {
  Form,
  Modal,
  Message,
  Icon,
  Grid,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import { getProjects, Project } from "../../utils/API/project_API";
import { User, getUsers } from "../../utils/API/user_API";
import Select from "react-select";
import { Issue, updateIssue, getIssue } from "../../utils/API/issue_API";
import { getIssueTypes, IssueType } from "../../utils/API/issuetype_API";
import { getPriorities, Priority } from "../../utils/API/priority_API";
import { KanbanType, getKanbanTypes } from "../../utils/API/kanbantype_API";
import "./style.css";

export interface ReactSelectProps {
  value: string;
  label: string | React.ReactNode;
}
export interface EditModalProps {
  issueId: string;
  currentUser: User;
  isOpen: boolean;
  handleClose: () => void;
  handleUpdate: (issueId: string) => void;
}
export interface EditModalState {
  isOpen: boolean;
  projectId: string;
  projects: Project[];
  projectsSelect: ReactSelectProps[];
  projectLabel: ReactSelectProps;
  projectsAreLoading: boolean;
  kanbanTypes: KanbanType[];
  kanbanTypesSelect: ReactSelectProps[];
  kanbanTypeLabel: ReactSelectProps;
  kanbanTypesAreLoading: boolean;
  issueTypes: IssueType[];
  issueTypesSelect: ReactSelectProps[];
  issueTypeLabel: ReactSelectProps;
  issueTypesAreLoading: boolean;
  assignees: User[];
  assigneesSelect: ReactSelectProps[];
  assigneeLabel: ReactSelectProps;
  assigneesAreLoading: boolean;
  priorities: Priority[];
  prioritiesSelect: ReactSelectProps[];
  priorityLabel: ReactSelectProps;
  prioritiesAreLoading: boolean;
  epics: any[];
  epicsAreLoading: boolean;
  currentIssue: Issue;
  summary: string;
  description: string;
  error: boolean;
  isLoading: boolean;
}
class EditModal extends React.Component<EditModalProps, EditModalState> {
  state: EditModalState = {
    assigneeLabel: null,
    assignees: [],
    assigneesAreLoading: true,
    assigneesSelect: [],
    currentIssue: null,
    description: "",
    summary: "",
    epics: [],
    epicsAreLoading: true,
    error: false,
    issueTypeLabel: null,
    issueTypes: [],
    issueTypesAreLoading: true,
    issueTypesSelect: [],
    kanbanTypeLabel: null,
    kanbanTypes: [],
    kanbanTypesAreLoading: true,
    kanbanTypesSelect: [],
    priorities: [],
    prioritiesAreLoading: true,
    prioritiesSelect: [],
    priorityLabel: null,
    projectId: "",
    projectLabel: null,
    projects: [],
    projectsAreLoading: true,
    projectsSelect: [],
    isOpen: this.props.isOpen,
    isLoading: true,
  };

  async componentDidMount() {
    await this.fetchProjects();
    await this.fetchIssueTypes();
    await this.fetchAssignees();
    await this.fetchKanbanTypes();
    await this.fetchPriorities();
    await this.fetchProjects();
    this.fetchIssue();
  }

  fetchIssue = async () => {
    const { data, success } = await getIssue(this.props.issueId);
    const {
      assigneeId,
      description,
      summary,
      statusId,
      projectId,
      epicId,
      creatorId,
      issueTypeId,
      priorityId,
    } = data;
    const issueType = this.state.issueTypes.find(
      (type) => type._id === issueTypeId
    );
    const project = this.state.projects.find(
      (project) => project._id === projectId
    );
    const user = this.state.assignees.find((user) => user._id === assigneeId);
    const priority = this.state.priorities.find(
      (priority) => priority._id === priorityId
    );
    const kanbanType = this.state.kanbanTypes.find(
      (kanban) => kanban._id === statusId
    );
    if (success) {
      this.setState({
        currentIssue: data,
        summary,
        description,
        projectId,
        isLoading: false,
        kanbanTypeLabel: this.createKanbanLabel(kanbanType),
        issueTypeLabel: this.createIssueTypeLabel(issueType),
        projectLabel: this.createProjectLabel(project),
        assigneeLabel: this.createAssigneeLabel(user),
        priorityLabel: this.createPriorityLabel(priority),
      });
    }
  };

  createProjectLabel = (project: Project) => {
    if (!project) return;
    return {
      value: project._id,
      label: `${project.name} (${project.key})`,
    };
  };

  fetchProjects = async () => {
    const { data, success } = await getProjects();
    this.setState({ projectsAreLoading: false });
    if (success) {
      const prepareData = data.map((project) =>
        this.createProjectLabel(project)
      );
      this.setState({
        projects: data,
        projectsSelect: prepareData,
        projectLabel: prepareData[0],
      });
    }
  };

  createIssueTypeLabel = (issueType: IssueType) => {
    if (!issueType) return;
    return {
      id: issueType.id,
      value: issueType._id,
      label: (
        <>
          <Icon name={issueType.icon as any} color={issueType.color as any} />
          {issueType.label}
        </>
      ),
    };
  };

  fetchIssueTypes = async () => {
    const { data, success } = await getIssueTypes();
    this.setState({ issueTypesAreLoading: false });
    if (success) {
      const prepareData = data.map((issueType) =>
        this.createIssueTypeLabel(issueType)
      );
      this.setState({
        issueTypesSelect: prepareData,
        issueTypes: data,
      });
    }
  };

  createAssigneeLabel = (user: User) => {
    if (!user) return;
    return {
      value: user._id,
      label: (
        <>
          {user.firstname} {user.lastname || ""}
        </>
      ),
    };
  };

  fetchAssignees = async () => {
    const { data, success } = await getUsers();
    this.setState({ assigneesAreLoading: false });
    if (success) {
      const prepareData = data.map((user) => this.createAssigneeLabel(user));
      this.setState({ assignees: data, assigneesSelect: prepareData });
    }
  };

  createPriorityLabel = (priority: Priority) => {
    if (!priority) return;
    return {
      id: priority.id,
      value: priority._id,
      label: (
        <>
          <Icon name={priority.icon as any} color={priority.color as any} />
          {priority.label}
        </>
      ),
    };
  };

  fetchPriorities = async () => {
    const { data, success } = await getPriorities();
    this.setState({ prioritiesAreLoading: false });
    if (success) {
      const prepareData = data.map((priority) =>
        this.createPriorityLabel(priority)
      );
      const priority = prepareData.find((prio) => prio.id === "medium");
      this.setState({
        priorityLabel: priority,
        priorities: data,
        prioritiesSelect: prepareData,
      });
    }
  };

  getIssueObjectValueName = (name: string) => {
    if (name === "issueTypeLabel") {
      return "issueTypeId";
    } else if (name === "projectLabel") {
      return "projectId";
    } else if (name === "assigneeLabel") {
      return "assigneeId";
    } else if (name === "priorityLabel") {
      return "priorityId";
    } else if (name === "kanbanTypeLabel") {
      return "statusId";
    } else {
      return "epicId";
    }
  };

  handleSelect = async (value, data) => {
    const { name } = data;
    const { value: valueId } = value;
    const { currentIssue } = this.state;
    const { success } = await updateIssue(currentIssue._id, {
      [this.getIssueObjectValueName(name)]: valueId,
    });
    if (success) {
      this.setState({ [name]: value } as any);
    }
  };

  createKanbanLabel = (kanban: KanbanType) => {
    if (!kanban) return;
    return {
      value: kanban._id,
      label: <>{kanban.label}</>,
    };
  };

  fetchKanbanTypes = async () => {
    const { data, success } = await getKanbanTypes();
    if (success) {
      const prepareData = data.map((kanbanType) => {
        return {
          value: kanbanType._id,
          label: kanbanType.label,
        };
      });
      this.setState({ kanbanTypes: data, kanbanTypesSelect: prepareData });
    }
  };

  IssueTypeIcon = () => {
    const { issueTypes, issueTypeLabel } = this.state;
    const issueType = issueTypes.find(
      (type) => type._id === issueTypeLabel.value
    );
    const { icon, color } = issueType;
    return <Icon name={icon as any} color={color as any} />;
  };

  issueTypeCustomStyles = {
    option: (provided) => ({
      ...provided,
      fontSize: "0.7em",
      maxWidth: 125,
      zIndex: 10000,
    }),
    menu: (provided) => ({
      ...provided,
      width: 125,
      zIndex: 10000,
    }),
    control: (provided) => ({
      ...provided,
      zIndex: 10000,
    }),
    menuPortal: (provided) => ({
      ...provided,
      zIndex: 10000,
    }),
    menuList: (provided) => ({
      ...provided,
      fontSize: "1.5em",
    }),
  };

  ProjectSelect = () => (
    <Select
      isClearable
      isSearchable
      onChange={this.handleSelect}
      isLoading={this.state.projectsAreLoading}
      name="projectLabel"
      id="project"
      value={this.state.projectLabel}
      options={this.state.projectsSelect}
      placeholder=""
    />
  );

  KanbanSelect = () => (
    <Select
      onChange={this.handleSelect}
      name="kanbanTypeLabel"
      id="kanban"
      value={this.state.kanbanTypeLabel}
      options={this.state.kanbanTypesSelect}
      placeholder=""
    />
  );

  IssueTypeSelect = () => (
    <Select
      menuPortalTarget={document.querySelector("body")}
      components={{
        DropdownIndicator: null,
        SingleValue: this.IssueTypeIcon,
      }}
      className="issue-type-select"
      styles={this.issueTypeCustomStyles}
      onChange={this.handleSelect}
      isLoading={this.state.issueTypesAreLoading}
      isSearchable={false}
      name="issueTypeLabel"
      id="issueType"
      value={this.state.issueTypeLabel}
      options={this.state.issueTypesSelect}
      placeholder=""
    />
  );

  AssigneeSelect = () => (
    <Select
      onChange={this.handleSelect}
      isLoading={this.state.assigneesAreLoading}
      isClearable
      isSearchable
      name="assigneeLabel"
      id="assignee"
      options={this.state.assigneesSelect}
      placeholder="Automatic"
      value={this.state.assigneeLabel}
    />
  );

  PrioritySelect = () => (
    <Select
      onChange={this.handleSelect}
      value={this.state.priorityLabel}
      isLoading={this.state.prioritiesAreLoading}
      isClearable
      isSearchable
      name="priorityLabel"
      id="priority"
      options={this.state.prioritiesSelect}
      placeholder=""
    />
  );

  EpicSelect = () => (
    <Select
      onChange={this.handleSelect}
      isLoading={this.state.epicsAreLoading}
      isClearable
      isSearchable
      name="epicLinkLabel"
      id="epicLink"
      defaultValue={this.state.epics[0]}
      options={this.state.epics}
      placeholder=""
    />
  );

  handleBlur = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { name, value } = target;
    const { currentIssue } = this.state;
    // Check if value is the same, so don't update
    if (currentIssue[name] === value) {
      return;
    }
    const { success } = await updateIssue(currentIssue._id, {
      [name]: value,
    });
    if (!success) {
      this.setState({ error: true });
    }
  };

  handleClose = () => {
    this.setState({ isOpen: !this.state.isOpen }, () => {
      this.props.handleClose();
      const { currentIssue } = this.state;
      this.props.handleUpdate(currentIssue._id);
    });
  };

  render() {
    const { currentIssue, isOpen, isLoading } = this.state;
    return (
      <>
        {isLoading && (
          <Dimmer active>
            <Loader content="Loading" />
          </Dimmer>
        )}
        {!isLoading && (
          <Modal
            open={isOpen}
            size="large"
            centered
            closeOnEscape
            onClose={this.handleClose}
          >
            <Modal.Header className="edit-header">
              <Form.Field
                id="issueType"
                name="issueType"
                control={this.IssueTypeSelect}
                required
              />
              <div>
                <h1>{currentIssue?.summary}</h1>
              </div>
            </Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Form>
                  <Grid columns="2" stackable>
                    <Grid.Column width="10">
                      <Form.Input
                        label={{ children: "Summary", htmlFor: "summary" }}
                        id="summary"
                        name="summary"
                        fluid
                        onChange={(event) =>
                          this.setState({ summary: event.target.value })
                        }
                        onBlur={(event) => this.handleBlur(event)}
                        required
                        value={this.state.summary}
                        focus
                      />
                      <Form.TextArea
                        id="description"
                        name="description"
                        onChange={(_, { value }) =>
                          this.setState({ description: value as string })
                        }
                        onBlur={(event) => this.handleBlur(event)}
                        label={{
                          children: "Description",
                          htmlFor: "description",
                        }}
                        rows="10"
                        value={this.state.description}
                      />
                    </Grid.Column>
                    <Grid.Column width="6">
                      <Form.Field
                        id="kanban"
                        name="kanbanType"
                        control={this.KanbanSelect}
                      />
                      <Form.Field
                        id="assignee"
                        name="assignee"
                        control={this.AssigneeSelect}
                        label={{ children: "Assignee", htmlFor: "assignee" }}
                      />
                      <Form.Field
                        id="priority"
                        name="priority"
                        control={this.PrioritySelect}
                        label={{ children: "Priority", htmlFor: "priority" }}
                      />
                      <Form.Field
                        id="epicLink"
                        name="epicLink"
                        control={this.EpicSelect}
                        label={{ children: "Epic Link", htmlFor: "epicLink" }}
                      />
                    </Grid.Column>
                  </Grid>

                  <Message
                    error
                    header="Issue could not be updated"
                    visible={this.state.error}
                  />
                </Form>
              </Modal.Description>
            </Modal.Content>
          </Modal>
        )}
      </>
    );
  }
}

export default EditModal;
