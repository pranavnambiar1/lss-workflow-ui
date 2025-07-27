import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Box, Typography, Paper } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Task } from '../types';

// Custom node component for Task nodes
const TaskNode = ({ data }: NodeProps) => {
  const task = data.task as Task;
  
  return (
    <Paper 
      elevation={2}
      sx={{
        padding: 2,
        borderRadius: 2,
        minWidth: 200,
        backgroundColor: '#f0f7ff',
        border: '2px solid #1976d2',
        '&:hover': {
          boxShadow: 3,
        }
      }}
    >
      {/* Source handle for outgoing connections - only on the right side */}
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        style={{ background: '#4CAF50', width: '12px', height: '12px', border: '2px solid #2E7D32' }}
      />
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <AssignmentIcon color="primary" />
        <Typography variant="subtitle1" fontWeight="bold">
          {task.name}
        </Typography>
      </Box>
      
      <Typography variant="body2" color="text.secondary">
        {task.description}
      </Typography>
      
      {/* No target handle - tasks cannot have incoming connections */}
    </Paper>
  );
};

export default memo(TaskNode);
