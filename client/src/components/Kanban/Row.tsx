import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Issue } from "../../utils/API/issue_API";
import { KanbanType } from "../../utils/API/kanbantype_API";
import { IssueType } from "../../utils/API/issuetype_API";
import { Priority } from "../../utils/API/priority_API";
import { Icon, Popup } from "semantic-ui-react";

export interface RowProps {
  kanbanType: KanbanType;
  issues: Issue[];
  handleEdit: (issueId: string) => void;
  priorities: Priority[];
  issueTypes: IssueType[];
}
const Row: React.FC<RowProps> = (props) => {
  const { kanbanType, issues, handleEdit, issueTypes, priorities } = props;

  const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? "rgb(255, 236, 230)" : "rgb(235, 236, 240)",
  });

  const getItemStyle = (draggableStyle, isDragging: boolean) => ({
    background: isDragging ? "rgb(227, 252, 239)" : null,
    borderColor: isDragging ? "unset" : "",
    ...draggableStyle,
  });

  const getPriority = (issue: Issue) => {
    const priority = priorities.find((prio) => prio._id === issue.priorityId);
    if (priority) {
      return (
        <Popup
          // @ts-ignore
          trigger={<Icon name={priority.icon} color={priority.color} />}
          inverted
          position="bottom center"
          size="mini"
        >
          {priority.label}
        </Popup>
      );
    }
    return null;
  };

  const getIssueType = (issue: Issue) => {
    const issueType = issueTypes.find(
      (issueType) => issueType._id === issue.issueTypeId
    );
    if (issueType) {
      return (
        <Popup
          // @ts-ignore
          trigger={<Icon name={issueType.icon} color={issueType.color} />}
          inverted
          position="bottom center"
          size="mini"
        >
          {issueType.label}
        </Popup>
      );
    }
    return null;
  };
  return (
    <>
      <li
        className={`drag-column drag-column${
          kanbanType.className ? "-" + kanbanType.className : ""
        }`}
      >
        <span className="drag-column-header">
          <h2>{kanbanType.label}</h2>
          <div>{issues.length}</div>
        </span>
        <Droppable droppableId={kanbanType._id}>
          {(provided, snapshot) => (
            <ul
              className="drag-inner-list"
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {issues.map((issue, index) => (
                <Draggable
                  key={issue._id}
                  draggableId={issue._id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <li
                      onClick={() => handleEdit(issue._id)}
                      className="drag-item"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        provided.draggableProps.style,
                        snapshot.isDragging
                      )}
                    >
                      <Popup
                        trigger={
                          <section className="top">{issue.summary}</section>
                        }
                        inverted
                        position="bottom center"
                        size="small"
                      >
                        {issue.summary}
                      </Popup>
                      <section className="bottom">
                        <div className="container">
                          <span>{getIssueType(issue)}</span>
                          <span>{getPriority(issue)}</span>
                        </div>
                      </section>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </li>
    </>
  );
};

export default Row;
