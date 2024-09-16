"use client";
import useTaskStore from "../store/store";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const { tasks } = useTaskStore();

  return (
    <ul>
      {tasks.length > 0 ? (
        tasks.map((task) => <TaskItem key={task.id} task={task} />)
      ) : (
        <p>No tasks available</p>
      )}
    </ul>
  );
};

export default TaskList;
