import Grid from '@material-ui/core/Grid';
import React from 'react';
import { Controls, MachineCanvas, StateInfo } from '../components';

const HomePage: React.FC = () => {
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <MachineCanvas />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controls />
          <StateInfo />
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;
