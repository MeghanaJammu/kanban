import React, { useState, useEffect } from "react";
import List from "./List";
import TaskModal from "./TaskModal";
import { DragDropContext } from "@hello-pangea/dnd";
import { dummyBoard } from "../utils/dummyData";
import { v4 as uuidv4 } from "uuid";

const LOCAL_KEY = "kanban-board";

const Board = () => {
  const [board, setBoard] = useState(() => {
    //  Load from localStorage only once
    const stored = localStorage.getItem(LOCAL_KEY);
    return stored ? JSON.parse(stored) : dummyBoard;
  });

  const [isModal, setIsModal] = useState(false);
  const [targetList, setTargetList] = useState(null);
  const [editCard, setEditCard] = useState(null);

  // Save to localStorage on board updates
  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(board));
  }, [board]);

  const onDragEnd = ({ source, destination }) => {
    if (!destination) return;

    // No change in position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    setBoard((prevBoard) => {
      const srcList = prevBoard.lists.find((l) => l.id === source.droppableId);
      const destList = prevBoard.lists.find(
        (l) => l.id === destination.droppableId
      );
      const draggedCard = srcList.cards[source.index];

      if (!draggedCard) return prevBoard;

      if (srcList.id === destList.id) {
        //  Same list → reorder
        const newCards = [...srcList.cards];
        newCards.splice(source.index, 1); // remove
        newCards.splice(destination.index, 0, draggedCard); // insert

        const newLists = prevBoard.lists.map((l) =>
          l.id === srcList.id ? { ...l, cards: newCards } : l
        );

        return { lists: newLists };
      } else {
        // 🟡 Different lists → remove & insert
        const newSrcCards = [...srcList.cards];
        newSrcCards.splice(source.index, 1);

        const newDestCards = [...destList.cards];
        newDestCards.splice(destination.index, 0, draggedCard);

        const newLists = prevBoard.lists.map((l) => {
          if (l.id === srcList.id) return { ...l, cards: newSrcCards };
          if (l.id === destList.id) return { ...l, cards: newDestCards };
          return l;
        });

        return { lists: newLists };
      }
    });
  };

  const openAdd = (listId) => {
    setTargetList(listId);
    setEditCard(null);
    setIsModal(true);
  };

  const openEdit = (listId, card) => {
    setTargetList(listId);
    setEditCard(card);
    setIsModal(true);
  };

  const onDelete = (listId, card) => {
    setBoard((prev) => ({
      lists: prev.lists.map((l) =>
        l.id === listId
          ? { ...l, cards: l.cards.filter((c) => c.id !== card.id) }
          : l
      ),
    }));
  };

  const onSave = (data) => {
    setBoard((prev) => ({
      lists: prev.lists.map((l) => {
        if (l.id !== targetList) return l;

        const updatedCards = data.id
          ? l.cards.map((c) => (c.id === data.id ? data : c))
          : [...l.cards, { ...data, id: uuidv4() }];

        return { ...l, cards: updatedCards };
      }),
    }));
  };

  return (
    <div className="bg-[#0f172a] text-[#e2e8f0] min-h-screen flex justify-center p-6 overflow-x-auto">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex items-start space-x-6">
          {board.lists.map((list) => (
            <List
              key={list.id}
              list={list}
              onAddClick={openAdd}
              onEditClick={(card) => openEdit(list.id, card)}
              onDeleteClick={(card) => onDelete(list.id, card)}
            />
          ))}
        </div>
      </DragDropContext>

      <TaskModal
        isOpen={isModal}
        onClose={() => setIsModal(false)}
        initialData={editCard}
        onSave={onSave}
      />
    </div>
  );
};

export default Board;
