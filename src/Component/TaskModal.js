import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { editTask } from '../JS/actions';

function TaskModal({ show, handleClose, currentTask }) {
    const [updatedTaskValue, setUpdatedTaskValue] = useState(currentTask?.text || "");
    const dispatch = useDispatch();

    const handleSave = () => {
        dispatch(editTask(currentTask.id, updatedTaskValue));
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Control
                    type="text"
                    value={updatedTaskValue}
                    onChange={(e) => setUpdatedTaskValue(e.target.value)}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default TaskModal;
