import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const Card = ({ card, index }) => {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          className="bg-white p-3 rounded-lg shadow-md mb-3 text-sm font-medium text-gray-700 hover:shadow-lg transition"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {card.title}
        </div>
      )}
    </Draggable>
  );
};

export default Card;
