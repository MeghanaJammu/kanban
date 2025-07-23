import React from "react";
import { Dialog } from "@headlessui/react";

const DetailsModal = ({ isOpen, onClose, card }) => {
  if (!card) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-[#1e293b] text-[#e2e8f0] w-full max-w-md p-6 rounded-lg shadow-lg border border-[#334155]">
          <Dialog.Title className="text-xl font-semibold mb-4">
            {card.title}
          </Dialog.Title>

          {card.image && (
            <img
              src={card.image}
              alt="thumb"
              className="w-full h-40 object-cover rounded mb-4"
            />
          )}

          {card.description && (
            <p className="mb-4 text-sm text-[#cbd5e1]">{card.description}</p>
          )}

          {card.dueDate && (
            <p className="mb-2">
              <span className="font-semibold">📅 Due Date:</span>{" "}
              {new Date(card.dueDate).toLocaleDateString()}
            </p>
          )}

          <p className="mb-2">
            <span className="font-semibold">⚡ Priority:</span>{" "}
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
          </p>

          {card.assignees?.length > 0 && (
            <div className="mb-4">
              <span className="font-semibold">👤 Assignees:</span>
              <div className="flex mt-2 -space-x-2">
                {card.assignees.map((a, i) => (
                  <img
                    key={i}
                    src={a.avatar}
                    alt={a.name}
                    title={a.name}
                    className="w-8 h-8 rounded-full border-2 border-[#1e293b]"
                  />
                ))}
              </div>
            </div>
          )}

          <button
            onClick={onClose}
            className="mt-4 w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded"
          >
            Close
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default DetailsModal;
