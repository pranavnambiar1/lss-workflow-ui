import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Box, Typography, Paper } from '@mui/material';
import ApiIcon from '@mui/icons-material/Api';
import { ApiNode as ApiNodeType } from '../types';

// Custom node component for API nodes
const ApiNode = ({ data }: NodeProps) => {
  // Extract API name from data - handle different data structures
  let apiName = '';
  console.log('API Node data:', data);
  
  // More aggressive extraction of API name from various possible locations
  if (data.api && typeof data.api === 'object') {
    if (data.api.name) {
      apiName = data.api.name;
      console.log('Found name in data.api.name:', apiName);
    }
  }
  
  // If still no name, try other locations
  if (!apiName && data.name) {
    apiName = data.name;
    console.log('Found name in data.name:', apiName);
  }
  
  if (!apiName && data.label) {
    apiName = data.label;
    console.log('Found name in data.label:', apiName);
  }
  
  // Last resort - use the node ID if it contains useful information
  if (!apiName && data.id && typeof data.id === 'string') {
    const idParts = data.id.split('-');
    if (idParts.length > 1) {
      apiName = idParts[0];
      console.log('Extracted name from ID:', apiName);
    }
  }
  
  // Get description if available
  let apiDescription = '';
  if (data.api && data.api.description) {
    apiDescription = data.api.description;
  }
  
  return (
    <Paper 
      elevation={2}
      sx={{
        padding: 2,
        borderRadius: 2,
        minWidth: 180,
        backgroundColor: '#fff8e6',
        border: '2px solid #f57c00',
        '&:hover': {
          boxShadow: 3,
        }
      }}
    >
      {/* Target handle for incoming connections from tasks */}
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        style={{ background: '#FF9800', width: '12px', height: '12px', border: '2px solid #E65100' }}
      />
      
      {/* Source/Target handles for API-to-API connections */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        style={{ background: '#2196F3', width: '12px', height: '12px', border: '2px solid #0D47A1' }}
      />
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        style={{ background: '#2196F3', width: '12px', height: '12px', border: '2px solid #0D47A1' }}
      />
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <ApiIcon color="warning" />
        <Typography variant="subtitle1" fontWeight="bold">
          {apiName || 'API Node'}
        </Typography>
      </Box>
      
      {apiDescription && (
        <Typography variant="body2" color="text.secondary">
          {apiDescription}
        </Typography>
      )}
      
      {data.api && data.api.responses && (
        <Box sx={{ mt: 1 }}>
          <Typography variant="caption" color="text.secondary">
            Responses:
          </Typography>
        </Box>
      )}
      
      {/* No source handle - APIs cannot have outgoing connections */}
    </Paper>
  );
};

export default memo(ApiNode);
