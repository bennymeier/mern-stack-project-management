import React from "react";
import "./style.css";
import {
  Issue,
  updateIssue,
  getIssuesByProjectId,
  getIssue,
} from "../../utils/API/issue_API";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableLocation,
} from "react-beautiful-dnd";
import { KanbanType, getKanbanTypes } from "../../utils/API/kanbantype_API";
import { connect } from "react-redux";
import { AppState } from "../../redux";
import { User } from "../../utils/API/user_API";
import { Project } from "../../utils/API/project_API";
import EditModal from "../Issue/EditModal";
import { IssueType } from "../../utils/API/issuetype_API";
import { Priority } from "../../utils/API/priority_API";
import { Icon } from "semantic-ui-react";
import Row from "./Row";

export interface SwimlaneProps {
  filterMyIssues: boolean;
  currentUser: User;
  currentProject: Project;
  issueTypes: IssueType[];
  priorities: Priority[];
}
export interface SwimlaneState {
  kanbanTypes: KanbanType[];
  filterMyIssues: boolean;
  showEditModal: boolean;
  currentIssueId: string;
}
class Swimlane extends React.Component<SwimlaneProps, SwimlaneState> {
  state: SwimlaneState = {
    kanbanTypes: [],
    filterMyIssues: false,
    showEditModal: false,
    currentIssueId: null,
  };

  fetchIssuesAndKanbanTypes = async () => {
    const { currentProject } = this.props;
    const { data, success } = await getKanbanTypes();
    if (success) {
      const kanbanTypes = data.map((type) => type._id);
      const { data: issues, success: isSuccess } = await getIssuesByProjectId(
        currentProject._id
      );
      if (isSuccess) {
        let state = {};
        kanbanTypes.forEach((id) => {
          state = {
            ...state,
            [id]: issues.filter(
              (issue) => issue.statusId === "" || issue.statusId === id
            ),
          };
        });
        this.setState({ kanbanTypes: data, ...state });
      }
    }
  };

  componentDidUpdate(nextProps) {
    if (this.props.currentProject !== nextProps.currentProject) {
      this.fetchIssuesAndKanbanTypes();
    }
  }

  filterMyIssues = () => {
    const { currentUser } = this.props;
    let state = {};
    (this.state.kanbanTypes as KanbanType[]).forEach((type) => {
      state = {
        ...state,
        [type._id]: this.state[type._id].filter(
          (issue: Issue) =>
            issue.creatorId === currentUser._id || issue.assigneeId
        ),
      };
    });
    this.setState({ ...state }, () => console.log(this.state));
  };

  move = (
    source: any,
    destination: any,
    droppableSource: DraggableLocation,
    droppableDestination: DraggableLocation
  ) => {
    const sourceClone: Issue[] = Array.from(source);
    const destClone: Issue[] = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);
    const result: { id: string; results: Issue[] }[] = [
      {
        id: droppableSource.droppableId,
        results: sourceClone,
      },
      { id: droppableDestination.droppableId, results: destClone },
    ];

    return result;
  };

  reorder = (list: Issue[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    const { droppableId: sourceDropId } = source;
    // dropped outside the list
    if (!destination) {
      return;
    }
    const { droppableId: destinationDropId } = destination;
    if (sourceDropId === destinationDropId) {
      const items = this.reorder(
        this.state[sourceDropId],
        source.index,
        destination.index
      );

      this.setState(
        { [sourceDropId]: items } as any,
        async () =>
          await updateIssue(draggableId, {
            index: destination.index,
          })
      );
    } else {
      const result = this.move(
        this.state[sourceDropId],
        this.state[destinationDropId],
        source,
        destination
      );
      this.setState(
        {
          [result[0].id]: result[0].results,
          [result[1].id]: result[1].results,
        } as any,
        async () =>
          await updateIssue(draggableId, {
            index: destination.index,
            statusId: destinationDropId,
          })
      );
    }
  };

  handleEdit = (issueId: string) => {
    this.setState({ showEditModal: true, currentIssueId: issueId });
  };

  handleClose = () => {
    this.setState({ showEditModal: !this.state.showEditModal });
  };

  updateIssue = async (issueId: string) => {
    const { data, success } = await getIssue(issueId);
    if (success) {
      const issueIndex = this.state[data.statusId].findIndex(
        (issue) => issue._id === issueId
      );
      let issues = [...this.state[data.statusId]];
      issues[issueIndex] = data;
      this.setState({
        [data.statusId]: issues,
      } as any);
    }
  };

  render() {
    const { showEditModal, currentIssueId } = this.state;
    const { currentUser, priorities, issueTypes } = this.props;
    return (
      <>
        {showEditModal && (
          <EditModal
            handleClose={this.handleClose}
            issueId={currentIssueId}
            isOpen={showEditModal}
            currentUser={currentUser}
            handleUpdate={this.updateIssue}
          />
        )}
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div className="drag-container">
            <ul className="drag-list">
              {this.state.kanbanTypes.map((kanban) => {
                return (
                  <Row
                    key={kanban._id}
                    issueTypes={issueTypes}
                    priorities={priorities}
                    kanbanType={kanban}
                    issues={this.state[kanban._id]}
                    handleEdit={(id) => this.handleEdit(id)}
                  />
                );
              })}
            </ul>
          </div>
        </DragDropContext>
      </>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  currentUser: state.auth.user,
  currentProject: state.currentProject,
  priorities: state.priorities,
  issueTypes: state.issueTypes,
});
export default connect(mapStateToProps)(Swimlane);
