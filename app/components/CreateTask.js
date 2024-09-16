"use client";
import { useState } from 'react';
import useTaskStore from '../store/store';

const CreateTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [errors, setErrors] = useState({});
  const addTask = useTaskStore((state) => state.addTask);

  const handleSubmit = (e) => {
    e.preventDefault();

    let validationErrors = {};
    if (!title.trim()) {
      validationErrors.title = "Title is required";
    }
    if (!description.trim()) {
      validationErrors.description = "Description is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newTask = {
      id: Date.now(),
      title,
      description,
      status,
    };

    addTask(newTask);
    setTitle('');
    setDescription('');
    setStatus('pending');
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <button type="submit" className="bg-blue-600 text-white p-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Add Task
      </button>
    </form>
  );
};

export default CreateTask;
