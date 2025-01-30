/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  IconButton, 
  Menu, 
  MenuItem, 
  List, 
  ListItem, 
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { updateTask, deleteTask } from '../features/tasks/tasksSlice';

export default function TaskList({ tasks }) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');

  const handleMenuOpen = (event, task) => {
    setAnchorEl(event.currentTarget);
    setSelectedTask(task);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    setEditedTitle(selectedTask.title);
    setEditDialogOpen(true);
    handleMenuClose();
  };

  const handleEditSave = async () => {
    if (editedTitle.trim()) {
      await dispatch(updateTask({ id: selectedTask.id, title: editedTitle }));
      setEditDialogOpen(false);
    }
  };

  const handleDelete = async () => {
    await dispatch(deleteTask(selectedTask.id));
    handleMenuClose();
  };

  return (
    <>
      <Card sx={{ maxWidth: 800, margin: '0 auto', mt: 4 }}>
        <CardHeader title="Your Tasks" />
        <CardContent>
          <List>
            {tasks.map((task) => (
              <ListItem
                key={task.id}
                secondaryAction={
                  <>
                    <IconButton edge="end" onClick={(e) => handleMenuOpen(e, task)}>
                      <MoreVertIcon />
                    </IconButton>
                  </>
                }
              >
                <ListItemText primary={task.title} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditClick}>Edit</MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          Delete
        </MenuItem>
      </Menu>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Task Title"
            fullWidth
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleEditSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}