"use client"
import { useState } from 'react';
import useTaskStore from '../store/store';

const TaskList = () => {
  const { tasks, updateTask, deleteTask } = useTaskStore((state) => ({
    tasks: state.tasks,
    updateTask: state.updateTask,
    deleteTask: state.deleteTask,
  }));

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedStatus, setUpdatedStatus] = useState('');

  const handleEdit = (task) => {
    setEditingTaskId(task.id);
    setUpdatedTitle(task.title);
    setUpdatedDescription(task.description);
    setUpdatedStatus(task.status);
  };

  const handleUpdate = (taskId) => {
    const updatedTask = {
      id: taskId,
      title: updatedTitle,
      description: updatedDescription,
      status: updatedStatus,
    };
    updateTask(taskId, updatedTask);
    setEditingTaskId(null); // Exit edit mode after updating
  };

  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <li key={task.id} className="border p-4 rounded-lg">
          {editingTaskId === task.id ? (
            <div>
              {/* Edit Mode */}
              <input
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
                className="border rounded p-2 mb-2 w-full"
              />
              <textarea
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
                className="border rounded p-2 mb-2 w-full"
              />
              <select
                value={updatedStatus}
                onChange={(e) => setUpdatedStatus(e.target.value)}
                className="border rounded p-2 mb-2 w-full"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <button
                onClick={() => handleUpdate(task.id)}
                className="bg-green-500 text-white p-2 rounded mr-2"
              >
                Save
              </button>
              <button
                onClick={() => setEditingTaskId(null)}
                className="bg-gray-500 text-white p-2 rounded"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div>
              {/* Display Mode */}
              <h3 className="text-lg font-bold">{task.title}</h3>
              <p>{task.description}</p>
              <p>Status: {task.status}</p>
              <button
                onClick={() => handleEdit(task)}
                className="bg-blue-500 text-white p-2 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="bg-red-500 text-white p-2 rounded"
              >
                Delete
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
