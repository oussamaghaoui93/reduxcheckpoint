import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ListGroup, Button, ButtonGroup } from 'react-bootstrap';
import Task from './Task';
import { deleteTask, doneTask } from '../JS/actions';

function TaskList({ setShowModal, setCurrentTask }) {
    const tasks = useSelector(state => state.tasks); // Get tasks from Redux store
    const dispatch = useDispatch();

    const [filter, setFilter] = useState('All'); // State to track selected filter

    const openUpdateModal = (task) => {
        setCurrentTask(task);
        setShowModal(true);
    };

    const filterTasks = () => {
        if (filter === 'All') return tasks;
        return tasks.filter(task => task.phase === filter);
    };

    return (
        <>
            {/* Filter Buttons */}
            <ButtonGroup className="mb-3 d-flex justify-content-center">
                <Button variant={filter === 'All' ? 'primary' : 'outline-primary'} onClick={() => setFilter('All')}>All</Button>
                <Button variant={filter === 'On Hold' ? 'primary' : 'outline-primary'} onClick={() => setFilter('On Hold')}>On Hold</Button>
                <Button variant={filter === 'Running' ? 'primary' : 'outline-primary'} onClick={() => setFilter('Running')}>Running</Button>
                <Button variant={filter === 'Finished' ? 'primary' : 'outline-primary'} onClick={() => setFilter('Finished')}>Finished</Button>
            </ButtonGroup>

            {/* Task List */}
            <ListGroup>
                {filterTasks().map(task => (
                    <Task
                        key={task.id}
                        task={task}
                        deleteTask={(id) => dispatch(deleteTask(id))}
                        updatePhase={(id) => dispatch(doneTask(id))}
                        openUpdateModal={openUpdateModal}
                    />
                ))}
            </ListGroup>
        </>
    );
}

export default TaskList;
