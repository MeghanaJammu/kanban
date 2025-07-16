import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const Card = ({ card, index, onEdit, onDelete }) => {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(prov) => (
        <div
          ref={prov.innerRef}
          {...prov.draggableProps}
          {...prov.dragHandleProps}
          className="bg-[#1e293b] text-[#e2e8f0] p-4 rounded-lg mb-3 flex flex-col border border-[#334155] hover:shadow-lg"
        >
          {card.image && (
            <img
              src={card.image}
              alt="thumb"
              className="w-full h-32 object-cover rounded mb-3"
            />
          )}
          <h3 className="font-semibold mb-1">{card.title}</h3>
          {card.description && (
            <p className="text-sm text-[#94a3b8] mb-2">{card.description}</p>
          )}
          <div className="flex items-center justify-between text-xs text-[#94a3b8] mb-2">
            {card.dueDate && <span>📅 By {card.dueDate}</span>}
            <span
              className={`px-2 py-1 rounded ${
                card.priority === "High"
                  ? "bg-red-600"
                  : card.priority === "Medium"
                  ? "bg-yellow-600"
                  : "bg-green-600"
              } text-white`}
            >
              {card.priority}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex -space-x-2">
              {card.assignees?.map((a, i) => (
                <img
                  key={i}
                  src={a.avatar}
                  alt={a.name}
                  title={a.name}
                  className="w-6 h-6 rounded-full border-2 border-[#1e293b]"
                />
              ))}
            </div>
            <div className="flex gap-2 text-lg">
              <button
                onClick={() => onEdit(card)}
                className="text-[#3b82f6] hover:text-blue-400"
              >
                <FiEdit2 />
              </button>
              <button
                onClick={() => onDelete(card)}
                className="text-red-500 hover:text-red-700"
              >
                <FiTrash2 />
              </button>
            </div>
          </div>

          <button className="mt-2 text-sm text-[#3b82f6] hover:underline self-start">
            See Details →
          </button>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
