import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { createBoard } from "../createBoard";
import { auth, db } from "../firebase";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Home = () => {
  const navigate = useNavigate();
  const [boards, setBoards] = useState([]);
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const jwtToken = Cookies.get("jwt_token");
    if (!jwtToken) navigate("/login");

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const boardsRef = collection(db, "users", user.uid, "boards");
        const unsubscribeBoards = onSnapshot(boardsRef, (snapshot) => {
          const userBoards = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setBoards(userBoards);
        });

        // Clean up Firestore listener
        return () => unsubscribeBoards();
      } else {
        navigate("/login");
      }
    });

    // Clean up Auth listener
    return () => unsubscribeAuth();
  }, []);

  const handleCreateBoard = async () => {
    if (!newBoardTitle.trim()) return;
    try {
      const boardId = await createBoard(newBoardTitle);
      setNewBoardTitle("");
      navigate(`/board/${boardId}`);
    } catch (err) {
      console.error("Error creating board", err);
    }
  };

  const confirmDeleteBoard = (boardId) => {
    setDeleteTargetId(boardId);
    setShowDeleteModal(true);
  };

  const deleteBoard = async () => {
    const uid = auth.currentUser?.uid;
    if (uid && deleteTargetId) {
      await deleteDoc(doc(db, "users", uid, "boards", deleteTargetId));
      setDeleteTargetId(null);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-950 text-white p-4">
      <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-xl p-6">
        <h1 className="text-xl font-bold mb-6 text-center">Your Projects !!</h1>

        {/* Create Board Input */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={newBoardTitle}
            onChange={(e) => setNewBoardTitle(e.target.value)}
            placeholder="What's your new Project?"
            className="flex-1 px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 placeholder-gray-400"
          />
          <button
            onClick={handleCreateBoard}
            className="px-4 py-2 bg-green-900 hover:bg-yellow-700 rounded-md text-white font-semibold"
          >
            Create
          </button>
        </div>

        {/* Show Boards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {boards.map((board) => (
            <div
              key={board.id}
              className="hover:bg-blue-950 bg-cyan-900 cursor-pointer p-4 rounded-md relative group transition duration-200"
            >
              <h2
                onClick={() => navigate(`/board/${board.id}`)}
                className="text-lg font-semibold cursor-pointer"
              >
                {board.title}
              </h2>
              <p>...</p>
              <p
                onClick={() => navigate(`/board/${board.id}`)}
                className="text-yellow-600 text-sm"
              >
                click here to see/make the workflow or manage tasks in this
                project
              </p>
              <button
                onClick={() => confirmDeleteBoard(board.id)}
                className="absolute cursor-pointer top-2 right-2 text-sm text-red-400 hover:text-red-300 hidden group-hover:block"
                title="Delete Board"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4 text-white">
              Confirm Deletion
            </h2>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete this board? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md text-white"
              >
                Cancel
              </button>
              <button
                onClick={deleteBoard}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
