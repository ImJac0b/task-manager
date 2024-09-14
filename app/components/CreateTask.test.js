import { render, screen, fireEvent } from '@testing-library/react'
import CreateTask from './CreateTask'

test('renders CreateTask form', () => {
  render(<CreateTask />)
  expect(screen.getByPlaceholderText('Title')).toBeInTheDocument()
  expect(screen.getByPlaceholderText('Description')).toBeInTheDocument()
  expect(screen.getByText('Add Task')).toBeInTheDocument()
})

test('submits a new task', () => {
  render(<CreateTask />)
  fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'New Task' } })
  fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Task Description' } })
  fireEvent.change(screen.getByRole('combobox'), { target: { value: 'in-progress' } })
  fireEvent.click(screen.getByText('Add Task'))
  // Add further assertions to verify task addition
})
