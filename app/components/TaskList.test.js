import { render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import TaskList from "./TaskList";
import useTaskStore from "../store/store";

jest.mock("../store/store", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("./TaskItem", () => ({
  __esModule: true,
  default: jest.fn(() => <div>TaskItem</div>),
}));

describe("TaskList Component", () => {
  let setTasksMock;

  beforeEach(() => {
    setTasksMock = jest.fn();
    useTaskStore.mockReturnValue({
      tasks: [],
      setTasks: setTasksMock,
    });
  });

  test("shows loading indicator while loading", () => {
    const initialTasks = [];
    render(<TaskList initialTasks={initialTasks} />);

    expect(screen.getByText("Loading tasks...")).toBeInTheDocument();
  });

  test("calls setTasks with initialTasks", async () => {
    const initialTasks = [
      { id: 1, title: "Task 1", description: "Description 1", status: "pending" },
      { id: 2, title: "Task 2", description: "Description 2", status: "completed" },
    ];

    render(<TaskList initialTasks={initialTasks} />);

    await waitFor(() => {
      expect(setTasksMock).toHaveBeenCalledWith(initialTasks);
    });
  });

  test("renders tasks when tasks are provided", async () => {
    const initialTasks = [
      { id: 1, title: "Task 1", description: "Description 1", status: "pending" },
    ];

    useTaskStore.mockReturnValue({
      tasks: initialTasks,
      setTasks: setTasksMock,
    });

    render(<TaskList initialTasks={initialTasks} />);

    await waitFor(() => {
      expect(screen.getByText("TaskItem")).toBeInTheDocument();
    });
  });

  test("shows no tasks message when no tasks are available", async () => {
    render(<TaskList initialTasks={[]} />);

    await waitFor(() => {
      expect(screen.getByText("No tasks available")).toBeInTheDocument();
    });
  });
});
