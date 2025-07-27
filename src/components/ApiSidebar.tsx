import React from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Chip,
  Divider,
} from '@mui/material';
import { DUMMY_APIS, SMFG_APIS } from '../constants';

interface ApiSidebarProps {
  lenderName: string;
}

const ApiSidebar: React.FC<ApiSidebarProps> = ({ lenderName }) => {
  const onDragStart = (event: React.DragEvent, api: any) => {
    console.log('Dragging API:', api);
    
    // Enhanced logging to debug data structure
    console.log('API name:', api.name);
    console.log('API description:', api.description);
    console.log('API category:', api.category);
    console.log('API responses:', api.responses);
    
    // Store the API data as JSON in the dataTransfer with complete information
    // Use a flatter structure to avoid nesting issues
    const apiNodeData = {
      id: `api-${Date.now()}`,
      type: 'api',
      data: {
        label: api.name, // Set label explicitly for display
        name: api.name,  // Ensure name is set
        description: api.description || '',
        api: api,        // Include the entire original API object
        isApi: true      // Flag to identify as API node
      }
    };
    
    console.log('Serializing API node data:', apiNodeData);
    event.dataTransfer.setData('application/reactflow', JSON.stringify(apiNodeData));
    event.dataTransfer.effectAllowed = 'move';
  };

  // Define API type for better type safety
  type ApiType = {
    id: string;
    name: string;
    description: string;
    category: string;
    responses?: Array<{id: string; name: string; description: string; data: {status: string}}>
  };

  // Select the appropriate API list based on the lender name (ensure proper typing)
  const apiList: ApiType[] = (lenderName === 'SMFG' ? SMFG_APIS : DUMMY_APIS) as ApiType[];

  // Group APIs by category
  const apisByCategory = apiList.reduce((acc: Record<string, ApiType[]>, api: ApiType) => {
    (acc[api.category] ||= []).push(api);
    return acc;
  }, {} as Record<string, ApiType[]>);

  return (
    <Box
      sx={{
        width: 300,
        height: '100vh',
        backgroundColor: 'white',
        borderRight: '1px solid #e0e0e0',
        overflow: 'auto',
        pt: 8, // Account for header
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Available APIs
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Drag and drop APIs to create your workflow
        </Typography>

        {Object.entries(apisByCategory).map(([category, apis]: [string, ApiType[]]) => (
          <Box key={category} sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
              {category}
            </Typography>
            <List dense>
              {apis.map((api: ApiType) => (
                <ListItem
                  key={api.id}
                  sx={{
                    border: '1px solid #e0e0e0',
                    borderRadius: 1,
                    mb: 1,
                    cursor: 'grab',
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                      borderColor: '#1976d2',
                    },
                    '&:active': {
                      cursor: 'grabbing',
                    },
                  }}
                  draggable
                  onDragStart={(e) => onDragStart(e, api)}
                >
                  <ListItemText
                    primary={api.name}
                    secondary={
                      <Box>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          {api.description}
                        </Typography>
                        {api.responses && (
                          <Chip
                            label={`${api.responses.length} responses`}
                            size="small"
                            variant="outlined"
                          />
                        )}
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
            {category !== Object.keys(apisByCategory)[Object.keys(apisByCategory).length - 1] && (
              <Divider sx={{ my: 2 }} />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ApiSidebar;
