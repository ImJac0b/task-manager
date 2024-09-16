import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CreateTask from "./CreateTask";
import useTaskStore from "../store/store";

jest.mock("../store/store", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    addTask: jest.fn(),
  })),
}));

describe("CreateTask Component", () => {
  let addTaskMock;

  beforeEach(() => {
    addTaskMock = jest.fn();
    useTaskStore.mockReturnValue({
      addTask: addTaskMock,
    });
  });

  test("shows validation errors when fields are empty", () => {
    render(<CreateTask />);

    fireEvent.click(screen.getByText("Add Task"));

    expect(screen.getByText("Title is required")).toBeInTheDocument();
    expect(screen.getByText("Description is required")).toBeInTheDocument();
  });

  test("calls addTask with correct data when form is submitted", () => {
    render(<CreateTask />);

    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "New Task" },
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "Task description" },
    });
    fireEvent.change(screen.getByLabelText("Status"), {
      target: { value: "in-progress" },
    });

    fireEvent.click(screen.getByText("Add Task"));

    expect(addTaskMock).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "New Task",
        description: "Task description",
        status: "in-progress",
      })
    );
  });

  test("clears the form fields after successful submission", () => {
    render(<CreateTask />);

    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "New Task" },
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "Task description" },
    });
    fireEvent.change(screen.getByLabelText("Status"), {
      target: { value: "completed" },
    });

    fireEvent.click(screen.getByText("Add Task"));

    expect(screen.getByLabelText("Title").value).toBe("");
    expect(screen.getByLabelText("Description").value).toBe("");
    expect(screen.getByLabelText("Status").value).toBe("pending");
  });
});
