/* eslint-disable no-unused-vars */
import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Card from "./Card";

const List = ({ list, i }) => {
  return (
    <div className="bg-gray-100 rounded-xl p-4 w-80 mr-4 flex-shrink-0">
      <h2 className="font-semibold text-lg mb-4">{list.title}</h2>
      <Droppable droppableId={list.id}>
        {(provided) => (
          <div
            className="min-h-[80px]"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {list.cards.map((card, idx) => (
              <Card key={card.id} card={card} index={idx} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default List;
