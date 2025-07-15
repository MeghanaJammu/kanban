import React, { useState } from "react";
import List from "./List";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { dummyBoard } from "../utils/dummyData";

const Board = () => {
  const [boardData, setBoardData] = useState(dummyBoard);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceList = boardData.lists.find(
      (list) => list.id === source.droppableId
    );
    const destList = boardData.lists.find(
      (list) => list.id === destination.droppableId
    );

    const draggedCard = sourceList.cards[source.index];

    // Remove from source
    const updatedSourceCards = Array.from(sourceList.cards);
    updatedSourceCards.splice(source.index, 1);

    // Add to destination
    const updatedDestCards = Array.from(destList.cards);
    updatedDestCards.splice(destination.index, 0, draggedCard);

    const newBoardLists = boardData.lists.map((list) => {
      if (list.id === sourceList.id)
        return { ...list, cards: updatedSourceCards };
      if (list.id === destList.id) return { ...list, cards: updatedDestCards };
      return list;
    });

    setBoardData({ lists: newBoardLists });
  };

  return (
    <div className="p-6 overflow-x-auto">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex items-start space-x-6">
          {boardData.lists.map((list, index) => (
            <List key={list.id} list={list} index={index} />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;
