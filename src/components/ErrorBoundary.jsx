// src/components/ErrorBoundary.jsx
import { Component } from 'react';
import { Alert, Box } from '@mui/material';

export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <Box sx={{ p: 3 }}>
          <Alert severity="error">
            Something went wrong: {this.state.error.toString()}
          </Alert>
        </Box>
      );
    }
    return this.props.children;
  }
}