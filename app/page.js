"use client"
import { useEffect } from 'react';
import TaskList from './components/TaskList';
import CreateTask from './components/CreateTask';
import { getInitialTasks } from './utils/getInitialTasks';
import useTaskStore from './store/store';

const TasksPage = () => {
  const { tasks, setTasks, addTask } = useTaskStore((state) => ({
    tasks: state.tasks,
    setTasks: state.setTasks,
    addTask: state.addTask,
  }));

  useEffect(() => {
    const fetchInitialTasks = async () => {
      const initialTasks = await getInitialTasks();
      setTasks(initialTasks);
    };

    fetchInitialTasks();
  }, [setTasks]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <CreateTask onCreate={(newTask) => addTask(newTask)} />
      <TaskList tasks={tasks} />
    </div>
  );
};

export default TasksPage;
