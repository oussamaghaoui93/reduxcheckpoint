import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';

function Task({ task, deleteTask, updatePhase, openUpdateModal }) {
    return (
        <ListGroup.Item>
            <div className="d-flex justify-content-between align-items-center">
                <span>{task.text} - <em>{task.phase}</em> - <small>{task.date}</small></span>
                <div>
                    <Button variant="success" size="sm" onClick={() => updatePhase(task.id)}>Next Phase</Button>{' '}
                    <Button variant="warning" size="sm" onClick={() => openUpdateModal(task)}>Edit</Button>{' '}
                    <Button variant="danger" size="sm" onClick={() => deleteTask(task.id)}>Delete</Button>
                </div>
            </div>
        </ListGroup.Item>
    );
}

export default Task;
