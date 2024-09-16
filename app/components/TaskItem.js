"use client";
import { useState } from "react";
import useTaskStore from "../store/store";

const TaskItem = ({ task }) => {
  const { updateTask, deleteTask } = useTaskStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    description: task.description,
    status: task.status,
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleEditClick = () => {
    setIsEditing(true);
    setError("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    if (!editedTask.title.trim() || !editedTask.description.trim()) {
      setError("Title and description cannot be empty");
      return;
    }

    updateTask(task.id, editedTask);
    setIsEditing(false);
    setMessage("Task updated successfully");
    setTimeout(() => setMessage(""), 2000);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedTask({
      title: task.title,
      description: task.description,
      status: task.status,
    });
  };

  const handleDeleteClick = () => {
    deleteTask(task.id);
    setMessage("Task deleted");
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <li className="border border-gray-300 p-4 mb-4 rounded-lg shadow-md">
      {isEditing ? (
        <div>
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleInputChange}
            className="text-gray-700 border border-gray-300 rounded-lg p-3 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Task Title"
          />
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleInputChange}
            className="text-gray-700 border border-gray-300 rounded-lg p-3 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Task Description"
          />
          <select
            name="status"
            value={editedTask.status}
            onChange={handleInputChange}
            className="text-gray-700 border border-gray-300 rounded-lg p-3 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <div className="flex gap-2">
            <button
              onClick={handleSaveClick}
              className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-150"
            >
              Save
            </button>
            <button
              onClick={handleCancelClick}
              className="bg-gray-600 text-white p-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition ease-in-out duration-150"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-gray-700 text-xl font-semibold mb-2">
            {task.title}
          </h2>
          <p className="text-gray-700 mb-2">{task.description}</p>
          <span
            className={`capitalize inline-block px-3 py-1 text-sm font-semibold rounded-full ${
              task.status === "completed"
                ? "bg-green-200 text-green-800"
                : "bg-yellow-200 text-yellow-800"
            }`}
          >
            {task.status}
          </span>
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleEditClick}
              className="w-20 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-150"
            >
              Edit
            </button>
            <button
              onClick={handleDeleteClick}
              className="w-20 bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition ease-in-out duration-150"
            >
              Delete
            </button>
          </div>
        </div>
      )}
      {message && <p className="text-green-500 mt-2">{message}</p>}
    </li>
  );
};

export default TaskItem;
