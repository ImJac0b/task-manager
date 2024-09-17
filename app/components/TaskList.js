"use client";
import { useEffect, useState } from "react";
import useTaskStore from "../store/store";
import TaskItem from "./TaskItem";

const TaskList = ({ initialTasks }) => {
  const { tasks, setTasks } = useTaskStore((state) => ({
    tasks: state.tasks,
    setTasks: state.setTasks,
  }));

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTasks = async () => {
      try {
        await setTasks(initialTasks);
        setLoading(false);
      } catch (err) {
        setError("Failed to load tasks.");
        setLoading(false);
      }
    };

    loadTasks();
  }, [initialTasks, setTasks]);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="text-center flex flex-col items-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
          <p className="mt-4 text-gray-700">Loading tasks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <ul>
      {tasks?.length > 0 ? (
        tasks?.map((task) => <TaskItem key={task.id} task={task} />)
      ) : (
        <p className="text-gray-700">No tasks available</p>
      )}
    </ul>
  );
};

export default TaskList;
