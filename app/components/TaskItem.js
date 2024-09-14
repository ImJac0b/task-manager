"use client"

import { useState } from 'react'
import useTaskStore from '../store/store'

const TaskItem = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)
  const [status, setStatus] = useState(task.status)
  const updateTask = useTaskStore((state) => state.updateTask)
  const deleteTask = useTaskStore((state) => state.deleteTask)

  const handleUpdate = () => {
    updateTask({ ...task, title, description, status })
    setIsEditing(false)
  }

  return (
    <div className="border p-4 mb-2">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full mb-2"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full mb-2"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border p-2 w-full mb-2"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <button onClick={handleUpdate} className="bg-green-500 text-white p-2 mr-2">
            Update
          </button>
          <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white p-2">
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <h3 className="text-xl font-bold">{task.title}</h3>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
          <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white p-2 mr-2">
            Edit
          </button>
          <button onClick={() => deleteTask(task.id)} className="bg-red-500 text-white p-2">
            Delete
          </button>
        </div>
      )}
    </div>
  )
}

export default TaskItem
