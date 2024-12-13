import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const PredictionResults = ({ result }) => {
  if (!result) return null;

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Prediction Results</Typography>
        <Typography variant="body1">
          {result.prediction}: {result.confidence}%
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PredictionResults;
