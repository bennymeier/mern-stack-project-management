import React from "react";
import {
  AutoSizer,
  List,
  CellMeasurerCache,
  CellMeasurer,
} from "react-virtualized";
import { UserData } from "../types";
import { Room, Message as MessageType } from "../../utils/API";
import Message from "./Message";

export interface ListRowRenderer {
  key: string | number;
  index: number;
  parent: any;
  style: React.CSSProperties;
}
export interface MessagesProps {
  currentUser: UserData;
  currentChannel: Room;
  messages: MessageType[];
}
const Messages: React.FC<MessagesProps> = (props) => {
  const { currentChannel, currentUser, messages } = props;
  const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 100,
  });

  const messageRenderer = ({ index, key, parent, style }: ListRowRenderer) => {
    const editedStyle = { ...style, top: (style.top as number) - 20 };
    return (
      <CellMeasurer
        key={key}
        cache={cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        <Message
          style={editedStyle}
          currentUser={currentUser as UserData}
          message={messages[index]}
        />
      </CellMeasurer>
    );
  };
  const chatWrapperEl = document.getElementById("chat-wrapper");
  let chatWrapperHeight = 0;
  if (chatWrapperEl) {
    chatWrapperHeight = chatWrapperEl.getBoundingClientRect().height - 50;
    console.log("HEIGHT ", chatWrapperHeight);
  }
  return (
    <div style={{ flex: 1 }}>
      <AutoSizer>
        {({ width, height }) => (
          <List
            scrollToIndex={messages.length}
            rowCount={messages.length}
            width={width}
            height={height}
            deferredMeasurementCache={cache}
            rowHeight={cache.rowHeight}
            rowRenderer={messageRenderer}
            overscanRowCount={3}
          />
        )}
      </AutoSizer>
    </div>
  );
};

export default Messages;
