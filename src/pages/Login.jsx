// src/pages/Login.jsx
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  Alert,
  Link
} from '@mui/material';

export default function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(formData));
    if (result.payload?.token) navigate('/');
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Task Manager Login
        </Typography>
      </Box>
      
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        <TextField
          fullWidth
          margin="normal"
          label="Username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          required
        />
        
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        
        <Button
          fullWidth
          variant="contained"
          type="submit"
          sx={{ mt: 3, mb: 2 }}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Logging in...' : 'Sign In'}
        </Button>
        
        <Box sx={{ textAlign: 'center' }}>
          <Link href="/register" variant="body2">
            Don&apos;t have an account? Register
          </Link>
        </Box>
      </Box>
    </Container>
  );
}