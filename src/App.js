import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
import { addTask } from './JS/actions';
import TaskList from './Component/TaskList';
import TaskModal from './Component/TaskModal';

function App() {
  const [newTask, setNewTask] = useState("");
  const [currentTask, setCurrentTask] = useState(null); // Task being updated
  const [showModal, setShowModal] = useState(false); // Modal state

  const tasks = useSelector(state => state.tasks); // Get tasks from Redux store
  const dispatch = useDispatch();

  const addTaskHandler = () => {
    if (newTask.trim() !== "") {
      const taskId = Date.now();
      dispatch(addTask({ id: taskId, text: newTask, phase: "On Hold", date: formatDate(taskId) }));
      setNewTask("");
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(2);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">To-Do List</h1>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <Button variant="primary" className="mt-2" onClick={addTaskHandler}>
          Add Task
        </Button>
      </Form.Group>

      <TaskList setShowModal={setShowModal} setCurrentTask={setCurrentTask} />

      <TaskModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        currentTask={currentTask}
      />
    </div>
  );
}

export default App;
