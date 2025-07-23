import React, { useState, useEffect } from "react";
import List from "./List";
import TaskModal from "./TaskModal";
import DetailsModal from "./DetailsModal";
import { DragDropContext } from "@hello-pangea/dnd";
import { v4 as uuidv4 } from "uuid";
import { db, auth } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";

const Board = () => {
  const [board, setBoard] = useState({ lists: [] });
  const [userId, setUserId] = useState(null);
  const [viewCard, setViewCard] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const [targetList, setTargetList] = useState(null);
  const [editCard, setEditCard] = useState(null);
  const [isAddingList, setIsAddingList] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");

  // Load board on login
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        setUserId(uid);
        const userRef = doc(db, "users", uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          setBoard(userDoc.data().board || { lists: [] });
        } else {
          await setDoc(userRef, { board: { lists: [] } });
        }
      } else {
        setUserId(null);
        setBoard({ lists: [] });
      }
    });
    return () => unsubscribe();
  }, []);

  // Save board to Firestore
  const saveBoardToDB = async (updatedBoard) => {
    if (!userId) return;
    try {
      const userRef = doc(db, "users", userId);
      await setDoc(userRef, { board: updatedBoard }, { merge: true });
    } catch (err) {
      console.error(err);
      toast.error("Failed to save board data.");
    }
  };

  // Drag and drop handler
  const onDragEnd = ({ source, destination }) => {
    if (!destination) return;
    setBoard((prevBoard) => {
      const srcList = prevBoard.lists.find((l) => l.id === source.droppableId);
      const destList = prevBoard.lists.find(
        (l) => l.id === destination.droppableId
      );
      const draggedCard = srcList.cards[source.index];
      if (!draggedCard) return prevBoard;

      if (srcList.id === destList.id) {
        const newCards = [...srcList.cards];
        newCards.splice(source.index, 1);
        newCards.splice(destination.index, 0, draggedCard);
        const updatedBoard = {
          lists: prevBoard.lists.map((l) =>
            l.id === srcList.id ? { ...l, cards: newCards } : l
          ),
        };
        saveBoardToDB(updatedBoard);
        return updatedBoard;
      } else {
        const newSrcCards = [...srcList.cards];
        newSrcCards.splice(source.index, 1);
        const newDestCards = [...destList.cards];
        newDestCards.splice(destination.index, 0, draggedCard);
        const updatedBoard = {
          lists: prevBoard.lists.map((l) => {
            if (l.id === srcList.id) return { ...l, cards: newSrcCards };
            if (l.id === destList.id) return { ...l, cards: newDestCards };
            return l;
          }),
        };
        saveBoardToDB(updatedBoard);
        return updatedBoard;
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
    const updatedBoard = {
      lists: board.lists.map((l) =>
        l.id === listId
          ? { ...l, cards: l.cards.filter((c) => c.id !== card.id) }
          : l
      ),
    };
    setBoard(updatedBoard);
    saveBoardToDB(updatedBoard);
  };

  const onSave = (data) => {
    const updatedBoard = {
      lists: board.lists.map((l) => {
        if (l.id !== targetList) return l;
        const updatedCards = data.id
          ? l.cards.map((c) => (c.id === data.id ? data : c))
          : [...l.cards, { ...data, id: uuidv4() }];
        return { ...l, cards: updatedCards };
      }),
    };
    setBoard(updatedBoard);
    saveBoardToDB(updatedBoard);
  };

  const addNewList = () => {
    if (!newListTitle.trim()) return;

    const newList = {
      id: uuidv4(),
      title: newListTitle,
      cards: [],
    };

    const updatedBoard = {
      ...board,
      lists: [...board.lists, newList],
    };

    setBoard(updatedBoard);
    saveBoardToDB(updatedBoard);

    setNewListTitle("");
    setIsAddingList(false);
  };

  const onDeleteList = (listId) => {
    const updatedBoard = {
      lists: board.lists.filter((l) => l.id !== listId),
    };
    setBoard(updatedBoard);
    saveBoardToDB(updatedBoard);
  };

  if (!board) {
    return (
      <div className="text-center text-gray-300 mt-20 text-xl">
        Loading your Kanban board...
      </div>
    );
  }

  return (
    <div className="bg-[#0f172a] text-[#e2e8f0] min-h-screen py-6 px-2">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="w-full max-w-7xl mx-auto flex flex-wrap gap-4 justify-center">
          {board.lists.map((list) => (
            <List
              key={list.id}
              list={list}
              onAddClick={openAdd}
              onEditClick={(card) => openEdit(list.id, card)}
              onDeleteClick={(card) => onDelete(list.id, card)}
              onViewDetails={(card) => setViewCard(card)}
              onDeleteList={() => onDeleteList(list.id)}
            />
          ))}
        </div>
      </DragDropContext>

      {/* Bottom Add List & Guidance (always at the end) */}
      <div className="flex flex-col items-center mt-6">
        <div className="bg-[#1e293b] p-4 rounded-lg w-64">
          {isAddingList ? (
            <>
              <input
                value={newListTitle}
                onChange={(e) => setNewListTitle(e.target.value)}
                placeholder="List title"
                className="w-full px-2 py-1 rounded bg-[#0f172a] text-white border border-gray-600"
              />
              <div className="flex mt-2 space-x-2">
                <button
                  onClick={addNewList}
                  className="bg-blue-600 hover:bg-blue-700 px-2 py-1 text-sm rounded"
                >
                  Add
                </button>
                <button
                  onClick={() => {
                    setIsAddingList(false);
                    setNewListTitle("");
                  }}
                  className="text-gray-400 text-sm"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={() => setIsAddingList(true)}
              className="text-gray-300 hover:text-white"
            >
              + Add List
            </button>
          )}
        </div>

        <div className="mt-4 text-gray-400 text-center max-w-md text-base">
          Create lists to categorize your tasks i.e., To do or In progress or
          Finished and etc. . Drag cards between lists to manage workflow
          efficiently.
        </div>
      </div>

      {/* Modals */}
      <TaskModal
        isOpen={isModal}
        onClose={() => setIsModal(false)}
        initialData={editCard}
        onSave={onSave}
      />
      <DetailsModal
        isOpen={!!viewCard}
        onClose={() => setViewCard(null)}
        card={viewCard}
      />
    </div>
  );
};

export default Board;
