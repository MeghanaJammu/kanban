import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import DatePicker from "react-datepicker";

const TaskModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [assignees, setAssignees] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setDueDate(initialData.dueDate ? new Date(initialData.dueDate) : null);
      setAssignees(initialData.assignees?.map((a) => a.name).join(", ") || "");
      setPriority(initialData.priority || "Medium");
      setImage(initialData.image || "");
    } else {
      setTitle("");
      setDescription("");
      setDueDate(null);
      setAssignees("");
      setPriority("Medium");
      setImage("");
    }
  }, [initialData, isOpen]);

  const handleSave = () => {
    const data = {
      ...initialData,
      title,
      description,
      dueDate: dueDate ? dueDate.toISOString().split("T")[0] : "",
      priority,
      image,
      assignees: assignees.split(",").map((name) => ({
        name: name.trim(),
        avatar: `https://ui-avatars.com/api/?name=${name.trim()}&background=3b82f6&color=fff`,
      })),
    };

    onSave(data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-10">
      <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50">
        <Dialog.Panel className="bg-[#1e293b] text-white p-6 rounded-lg w-full max-w-md border border-[#334155]">
          <Dialog.Title className="text-lg font-semibold mb-4">
            {initialData ? "Edit Task" : "Add Task"}
          </Dialog.Title>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              className="w-full px-3 py-2 bg-[#0f172a] border border-[#334155] rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Description"
              className="w-full px-3 py-2 h-20 bg-[#0f172a] border border-[#334155] rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <DatePicker
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
              placeholderText="Select due date"
              dateFormat="yyyy-MM-dd"
              className="w-full px-3 py-2 bg-[#0f172a] border border-[#334155] rounded text-white"
              calendarClassName="bg-[#1e293b] text-white"
            />
            <input
              type="text"
              placeholder="Assignees (comma separated)"
              className="w-full px-3 py-2 bg-[#0f172a] border border-[#334155] rounded"
              value={assignees}
              onChange={(e) => setAssignees(e.target.value)}
            />
            <select
              className="w-full px-3 py-2 bg-[#0f172a] border border-[#334155] rounded"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
            <input
              type="text"
              placeholder="Image URL (optional)"
              className="w-full px-3 py-2 bg-[#0f172a] border border-[#334155] rounded"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#334155] hover:bg-[#475569] rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-[#3b82f6] hover:bg-blue-500 rounded"
            >
              Save
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default TaskModal;
