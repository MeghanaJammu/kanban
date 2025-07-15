import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import Card from "./Card";

const List = ({ list, onAddClick, onEditClick, onDeleteClick }) => {
  return (
    <Droppable droppableId={list.id}>
      {(prov) => (
        <div
          ref={prov.innerRef}
          {...prov.droppableProps}
          className="bg-[#1e293b] text-[#e2e8f0] rounded-xl p-4 w-80 flex-shrink-0 border border-[#334155] flex flex-col"
        >
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">{list.title}</h2>
            <button
              onClick={() => onAddClick(list.id)}
              className="text-sm text-[#3b82f6] hover:text-blue-400"
            >
              + Add
            </button>
          </div>

          <div className="flex-1">
            {list.cards.map((card, idx) => (
              <Card
                key={card.id}
                card={card}
                index={idx}
                onEdit={onEditClick}
                onDelete={onDeleteClick}
              />
            ))}
            {prov.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default List;
