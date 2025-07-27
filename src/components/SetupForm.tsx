import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Container,
} from '@mui/material';
import { ASSET_CLASSES, LENDERS } from '../constants';

interface SetupFormProps {
  onComplete: (assetClass: string, lenderName: string) => void;
}

const SetupForm: React.FC<SetupFormProps> = ({ onComplete }) => {
  const [assetClass, setAssetClass] = useState('');
  const [lenderName, setLenderName] = useState('');

  const handleSubmit = () => {
    if (assetClass && lenderName) {
      onComplete(assetClass, lenderName);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            maxWidth: 500,
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom align="center">
            LSS Workflow Builder
          </Typography>
          <Typography variant="body1" gutterBottom align="center" sx={{ mb: 3 }}>
            Configure your loan workflow by selecting the asset class and lender
          </Typography>

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Asset Class</InputLabel>
            <Select
              value={assetClass}
              label="Asset Class"
              onChange={(e) => setAssetClass(e.target.value)}
            >
              {ASSET_CLASSES.map((asset) => (
                <MenuItem key={asset} value={asset}>
                  {asset}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Lender Name</InputLabel>
            <Select
              value={lenderName}
              label="Lender Name"
              onChange={(e) => setLenderName(e.target.value)}
            >
              {LENDERS.map((lender) => (
                <MenuItem key={lender} value={lender}>
                  {lender}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handleSubmit}
            disabled={!assetClass || !lenderName}
            sx={{ mt: 2 }}
          >
            Start Building Workflow
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default SetupForm;
