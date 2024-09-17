import { render, screen, fireEvent } from "@testing-library/react";
import CreateTask from "../components/CreateTask";

jest.mock("../store/store", () => ({
  __esModule: true,
  default: () => ({
    addTask: jest.fn(),
  }),
}));

describe("CreateTask Component", () => {
  test("renders form inputs", () => {
    render(<CreateTask />);

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
  });

  test("shows validation errors when inputs are empty", () => {
    render(<CreateTask />);

    fireEvent.submit(screen.getByRole("button", { name: /add task/i }));

    expect(screen.getByText(/title is required/i)).toBeInTheDocument();
    expect(screen.getByText(/description is required/i)).toBeInTheDocument();
  });
});
