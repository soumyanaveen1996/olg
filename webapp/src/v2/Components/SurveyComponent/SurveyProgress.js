import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#2fc76f"
  },
}));

const SurveyProgress = ({ percentage }) => {
  return (
    <Box sx={{ flexGrow: 1, mb: 2 }}>
      <BorderLinearProgress variant="determinate" value={percentage} />
    </Box>
  );
}

export default SurveyProgress;