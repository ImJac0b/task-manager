export async function getInitialTasks() {
  return [
    { id: 1, title: "Task 1", description: "Description 1", status: "pending" },
    { id: 2, title: "Task 2", description: "Description 2", status: "in-progress" },
    { id: 3, title: "Task 3", description: "Description 3", status: "completed" },
  ];
}
