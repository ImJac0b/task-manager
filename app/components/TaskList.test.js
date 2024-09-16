import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TaskList from "./TaskList";
import useTaskStore from "../store/store";

jest.mock("../store/store", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("./TaskItem", () => {
  const TaskItem = ({ task }) => <div>{task.title}</div>;
  TaskItem.displayName = "TaskItem";
  return TaskItem;
});

describe("TaskList Component", () => {
  test("renders tasks when available", () => {
    const mockTasks = [
      {
        id: 1,
        title: "Task 1",
        description: "Description 1",
        status: "pending",
      },
      {
        id: 2,
        title: "Task 2",
        description: "Description 2",
        status: "completed",
      },
    ];
    useTaskStore.mockReturnValue({ tasks: mockTasks });

    render(<TaskList />);

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });

  test("shows no tasks message when no tasks available", () => {
    useTaskStore.mockReturnValue({ tasks: [] });

    render(<TaskList />);

    expect(screen.getByText("No tasks available")).toBeInTheDocument();
  });
});
