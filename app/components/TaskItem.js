"use client"

const TaskItem = ({ task }) => {
  return (
    <li className="border p-4 mb-2">
      <h2 className="text-xl">{task.title}</h2>
      <p>{task.description}</p>
      <span className={`badge ${task.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'}`}>
        {task.status}
      </span>
    </li>
  );
};

export default TaskItem;