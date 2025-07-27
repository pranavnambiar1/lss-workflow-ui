import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Box,
  Chip,
} from '@mui/material';
import { DUMMY_APIS } from '../constants';

interface ResponseSelectorModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (responseId: string) => void;
  sourceNodeId: string;
}

const ResponseSelectorModal: React.FC<ResponseSelectorModalProps> = ({
  open,
  onClose,
  onSelect,
  sourceNodeId,
}) => {
  // Find the API associated with the source node
  // For now, we'll use the first API as an example
  const sourceApi = DUMMY_APIS[0]; // This should be dynamically determined based on sourceNodeId

  if (!sourceApi) {
    return null;
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h6">
          Select Response from {sourceApi.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Choose which response should trigger the next API in the workflow
        </Typography>
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Available Responses:
          </Typography>
        </Box>
        
        <List>
          {sourceApi.responses.map((response) => (
            <ListItem key={response.id} disablePadding>
              <ListItemButton
                onClick={() => onSelect(response.id)}
                sx={{
                  border: '1px solid #e0e0e0',
                  borderRadius: 1,
                  mb: 1,
                  '&:hover': {
                    borderColor: '#1976d2',
                    backgroundColor: '#f8f9ff',
                  },
                }}
              >
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {response.name}
                      </Typography>
                      <Chip 
                        label="Response" 
                        size="small" 
                        color="primary" 
                        variant="outlined" 
                      />
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        {response.description}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Sample Data: {JSON.stringify(response.data, null, 2)}
                      </Typography>
                    </Box>
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ResponseSelectorModal;
