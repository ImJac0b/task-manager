"use client"

import useTaskStore from '../store/store'
import TaskItem from './TaskItem'

const TaskList = () => {
  const tasks = useTaskStore((state) => state.tasks)

  return (
    <div>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  )
}

export default TaskList