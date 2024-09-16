import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TaskItem from "./TaskItem";
import useTaskStore from "../store/store";

jest.mock("../store/store", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    updateTask: jest.fn(),
    deleteTask: jest.fn(),
  })),
}));

describe("TaskItem Component", () => {
  let updateTaskMock, deleteTaskMock;

  beforeEach(() => {
    updateTaskMock = jest.fn();
    deleteTaskMock = jest.fn();
    useTaskStore.mockReturnValue({
      updateTask: updateTaskMock,
      deleteTask: deleteTaskMock,
    });
  });

  test("shows validation error when saving with empty fields", () => {
    const task = {
      id: 1,
      title: "Existing Task",
      description: "Description",
      status: "pending",
    };
    render(<TaskItem task={task} />);

    fireEvent.click(screen.getByText("Edit"));

    fireEvent.change(screen.getByLabelText("Title"), { target: { value: "" } });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "" },
    });

    fireEvent.click(screen.getByText("Save"));

    expect(
      screen.getByText("Title and description cannot be empty")
    ).toBeInTheDocument();
  });

  test("calls updateTask with correct data when saving", async () => {
    const task = {
      id: 1,
      title: "Existing Task",
      description: "Description",
      status: "pending",
    };
    render(<TaskItem task={task} />);

    fireEvent.click(screen.getByText("Edit"));

    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "Updated Task" },
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "Updated Description" },
    });
    fireEvent.change(screen.getByLabelText("Status"), {
      target: { value: "completed" },
    });

    fireEvent.click(screen.getByText("Save"));

    expect(updateTaskMock).toHaveBeenCalledWith(1, {
      title: "Updated Task",
      description: "Updated Description",
      status: "completed",
    });

    expect(
      await screen.findByText("Task updated successfully")
    ).toBeInTheDocument();
  });

  test("calls deleteTask when deleting a task", async () => {
    const task = {
      id: 1,
      title: "Existing Task",
      description: "Description",
      status: "pending",
    };
    render(<TaskItem task={task} />);

    fireEvent.click(screen.getByText("Delete"));

    expect(deleteTaskMock).toHaveBeenCalledWith(1);

    expect(await screen.findByText("Task deleted")).toBeInTheDocument();
  });

  test("cancels editing and restores original values", () => {
    const task = {
      id: 1,
      title: "Existing Task",
      description: "Description",
      status: "pending",
    };
    render(<TaskItem task={task} />);

    fireEvent.click(screen.getByText("Edit"));

    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "New Title" },
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "New Description" },
    });

    fireEvent.click(screen.getByText("Cancel"));

    expect(screen.getByLabelText("Title").value).toBe("Existing Task");
    expect(screen.getByLabelText("Description").value).toBe("Description");
  });
});
