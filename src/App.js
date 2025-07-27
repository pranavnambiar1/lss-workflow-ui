import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import SetupForm from './components/SetupForm';
import WorkflowBuilder from './components/WorkflowBuilder';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  const [workflowState, setWorkflowState] = useState({
    assetClass: '',
    lenderName: '',
    nodes: [],
    edges: [],
  });

  const [isSetupComplete, setIsSetupComplete] = useState(false);

  const handleSetupComplete = (assetClass, lenderName) => {
    setWorkflowState(prev => ({
      ...prev,
      assetClass,
      lenderName,
    }));
    setIsSetupComplete(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ height: '100vh', width: '100vw' }}>
        {!isSetupComplete ? (
          <SetupForm onComplete={handleSetupComplete} />
        ) : (
          <WorkflowBuilder 
            workflowState={workflowState}
            setWorkflowState={setWorkflowState}
          />
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;
