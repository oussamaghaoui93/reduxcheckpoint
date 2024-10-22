import { ADD_TASK, DELETE_TASK, DONE_TASK, EDIT_TASK } from './actionTypes';

const initialState = {
    tasks: [],
};

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks, action.payload],
            };

        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload),
            };

        case DONE_TASK:
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task.id === action.payload
                        ? { ...task, phase: nextPhase(task.phase) }
                        : task
                ),
            };

        case EDIT_TASK:
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task.id === action.payload.id
                        ? { ...task, text: action.payload.updatedTask }
                        : task
                ),
            };

        default:
            return state;
    }
};

// Helper function to cycle phases
const nextPhase = (currentPhase) => {
    const phases = ['On Hold', 'Running', 'Finished'];
    const currentIndex = phases.indexOf(currentPhase);
    return phases[(currentIndex + 1) % phases.length];
};

export default taskReducer;
