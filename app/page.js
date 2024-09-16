"use client";
import { useEffect } from 'react';
import TaskList from './components/TaskList';
import CreateTask from './components/CreateTask';
import useTaskStore from './store/store';

const TasksPage = () => {
  const { setTasks } = useTaskStore((state) => ({
    setTasks: state.setTasks,
  }));

  useEffect(() => {
    const fetchInitialTasks = async () => {
      try {
        const response = await fetch('/api/initialTasks');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const initialTasks = await response.json();
        setTasks(initialTasks);
      } catch (error) {
        console.error('Error fetching initial tasks:', error);
      }
    };

    fetchInitialTasks();
  }, [setTasks]);

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Task Manager</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <CreateTask />
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <TaskList />
      </div>
    </div>
  );
};

export default TasksPage;
