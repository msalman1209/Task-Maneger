import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container, Typography, CircularProgress } from '@mui/material';
import { fetchTasks } from '../features/tasks/tasksSlice';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

export default function TaskManager() {
    const dispatch = useDispatch();
    const { items: tasks, status } = useSelector((state) => state.tasks);

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Task Manager
            </Typography>
            <TaskForm />
            {status === 'loading' ? (
                <CircularProgress sx={{ mt: 4 }} />
            ) : (
                <TaskList tasks={tasks} />
            )}
        </Container>
    );
}