import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Chip,
  Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import { JOBS } from '../constants';
import { WorkflowNode, Task } from '../types';

interface JobsPanelProps {
  onNodeAdd: (node: WorkflowNode) => void;
  onTaskSelect: (task: Task) => void;
}

const JobsPanel: React.FC<JobsPanelProps> = ({ onNodeAdd, onTaskSelect }) => {
  // Function to handle task selection
  const handleTaskSelect = (task: Task) => {
    // Play a click sound when a task is selected
    const audio = new Audio('/sounds/click.mp3');
    audio.play().catch(e => console.log('Audio play failed:', e));
    
    // Call the parent component's onTaskSelect callback
    onTaskSelect(task);
  };

  return (
    <Box
      sx={{
        width: 350,
        height: '100vh',
        backgroundColor: 'white',
        borderLeft: '1px solid #e0e0e0',
        overflow: 'auto',
        pt: 8, // Account for header
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Workflow Jobs
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Drop APIs onto tasks to create workflow steps
        </Typography>

        {JOBS.map((job, index) => (
          <Accordion key={job.id} defaultExpanded={index === 0}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {job.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {job.description}
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <List dense>
                {job.tasks.map((task) => (
                  <ListItem
                    key={task.id}
                    onClick={() => handleTaskSelect(task)}
                    sx={{
                      border: '1px solid #e0e0e0',
                      borderRadius: 1,
                      mb: 1,
                      minHeight: 60,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: 2,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor: '#f0f7ff',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                          {task.name}
                        </Typography>
                      }
                      secondary={task.description}
                    />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};

export default JobsPanel;
