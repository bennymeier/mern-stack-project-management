import React from "react";
import { Button } from "semantic-ui-react";
import "./style.css";
import { getIssues, Issue, updateIssue } from "../../utils/API/issue_API";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  ResponderProvided,
  DraggableLocation,
} from "react-beautiful-dnd";
import { KanbanType, getKanbanTypes } from "../../utils/API/kanbantype_API";

export interface SwimlaneState {
  kanbanTypes: KanbanType[];
}
class Swimlane extends React.Component<{}, SwimlaneState> {
  state: any = {
    kanbanTypes: [],
  };

  fetchIssuesAndKanbanTypes = async () => {
    const { data, success } = await getKanbanTypes();
    if (success) {
      const kanbanTypes = data.map((type) => type._id);
      const { data: issues, success: isSuccess } = await getIssues();
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
  };

  componentDidMount() {
    this.fetchIssuesAndKanbanTypes();
  }

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

  getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? "rgb(255, 236, 230)" : "rgb(235, 236, 240)",
  });

  getItemStyle = (draggableStyle, isDragging: boolean) => ({
    background: isDragging ? "rgb(227, 252, 239)" : "rgb(255, 255, 255)",
    borderColor: isDragging ? "unset" : "",
    ...draggableStyle,
  });

  onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    const { source, destination, draggableId } = result;
    const { droppableId: sourceDropId } = source;
    const { droppableId: destinationDropId } = destination;
    // dropped outside the list
    if (!destination) {
      return;
    }

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

  render() {
    const { kanbanTypes } = this.state;
    return (
      <>
        {!!kanbanTypes.length && (
          <DragDropContext onDragEnd={this.onDragEnd}>
            <div className="drag-container">
              <ul className="drag-list">
                <li className="drag-column drag-column-backlog">
                  <span className="drag-column-header">
                    <h2>Backlog</h2>
                  </span>
                  <Droppable droppableId={kanbanTypes[0]._id}>
                    {(provided, snapshot) => (
                      <ul
                        className="drag-inner-list"
                        ref={provided.innerRef}
                        style={this.getListStyle(snapshot.isDraggingOver)}
                      >
                        {this.state[kanbanTypes[0]._id].map((issue, index) => (
                          <Draggable
                            key={issue._id}
                            draggableId={issue._id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <li
                                className="drag-item"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={this.getItemStyle(
                                  provided.draggableProps.style,
                                  snapshot.isDragging
                                )}
                              >
                                {issue.summary}
                              </li>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </ul>
                    )}
                  </Droppable>
                </li>
                <li className="drag-column drag-column-todo">
                  <span className="drag-column-header">
                    <h2>Todo</h2>
                  </span>
                  <Droppable droppableId={kanbanTypes[1]._id}>
                    {(provided, snapshot) => (
                      <ul
                        className="drag-inner-list"
                        ref={provided.innerRef}
                        style={this.getListStyle(snapshot.isDraggingOver)}
                      >
                        {this.state[kanbanTypes[1]._id].map((issue, index) => (
                          <Draggable
                            key={issue._id}
                            draggableId={issue._id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <li
                                className="drag-item"
                                id={issue._id}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={this.getItemStyle(
                                  provided.draggableProps.style,
                                  snapshot.isDragging
                                )}
                              >
                                {issue.summary}
                              </li>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </ul>
                    )}
                  </Droppable>
                </li>
                <li className="drag-column drag-column-in-progress">
                  <span className="drag-column-header">
                    <h2>In Progress</h2>
                  </span>
                  <Droppable droppableId={kanbanTypes[2]._id}>
                    {(provided, snapshot) => (
                      <ul
                        className="drag-inner-list"
                        ref={provided.innerRef}
                        style={this.getListStyle(snapshot.isDraggingOver)}
                      >
                        {this.state[kanbanTypes[2]._id].map((issue, index) => (
                          <Draggable
                            key={issue._id}
                            draggableId={issue._id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <li
                                className="drag-item"
                                id={issue._id}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={this.getItemStyle(
                                  provided.draggableProps.style,
                                  snapshot.isDragging
                                )}
                              >
                                {issue.summary}
                              </li>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </ul>
                    )}
                  </Droppable>
                </li>
                <li className="drag-column drag-column-done">
                  <span className="drag-column-header">
                    <h2>Done</h2>
                  </span>
                  <Droppable droppableId={kanbanTypes[3]._id}>
                    {(provided, snapshot) => (
                      <ul
                        className="drag-inner-list"
                        ref={provided.innerRef}
                        style={this.getListStyle(snapshot.isDraggingOver)}
                      >
                        {this.state[kanbanTypes[3]._id].map((issue, index) => (
                          <Draggable
                            key={issue._id}
                            draggableId={issue._id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <li
                                className="drag-item"
                                id={issue._id}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={this.getItemStyle(
                                  provided.draggableProps.style,
                                  snapshot.isDragging
                                )}
                              >
                                {issue.summary}
                              </li>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </ul>
                    )}
                  </Droppable>
                </li>
              </ul>
            </div>
          </DragDropContext>
        )}
      </>
    );
  }
}

export default Swimlane;
