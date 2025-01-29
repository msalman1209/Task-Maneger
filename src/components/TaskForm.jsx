import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../features/tasks/tasksSlice';
import { TextField, Button, Box } from '@mui/material';

export default function TaskForm() {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    dispatch(addTask(title));
    setTitle('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <TextField
        fullWidth
        variant="outlined"
        label="Add new task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mr: 2 }}
      />
      <Button
        type="submit"
        variant="contained"
        size="large"
        sx={{ mt: 2 }}
      >
        Add Task
      </Button>
    </Box>
  );
}