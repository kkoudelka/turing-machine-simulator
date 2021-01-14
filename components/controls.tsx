import { Paper, Grid, Typography, Button } from '@material-ui/core';
import React, { useState } from 'react';
import useAppContext from '../src/hooks';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  spacing: {
    marginTop: '1rem',
    marginBottom: '1rem',
    padding: '1rem',
  },
});

const Controls: React.FC = () => {
  const {
    machineState,
    currentSymbol,
    headLeft,
    headRight,
    instructions,
    write,
    setMachineState,
    setCurrentInstruction,
    currentInstruction,
  } = useAppContext();

  const [playing, setPlaying] = useState(false);

  const classes = useStyles();

  const toggle = () => {
    setPlaying(!playing);
  };

  const startPlaying = () => {
    setPlaying(true);
  };

  const stopPlaying = () => {
    setPlaying(false);
  };

  const makeStep = () => {
    const validStep = instructions.find(
      (x) => x.state == machineState && x.symbol == currentSymbol,
    );

    if (!validStep) {
      stopPlaying();
      setCurrentInstruction(null);
      return;
    }

    setCurrentInstruction(validStep);
    if (validStep.write != '') write(validStep.write);

    if (validStep.move == 'LEFT') headLeft();
    else headRight();

    setMachineState(validStep.newstate);
  };

  return (
    <Paper className={classes.spacing}>
      <Grid container direction="column" spacing={2}>
        <Grid item container justify="space-around">
          <Grid item>
            <Typography>Current state: {machineState}</Typography>
          </Grid>
          <Grid item>
            <Typography>Current symbol: {currentSymbol}</Typography>
          </Grid>
        </Grid>
        <Grid item container justify="space-around">
          <Grid item>
            <Button variant="contained" color="primary" onClick={toggle}>
              {playing && <> {<PauseIcon />} Pause simulation</>}
              {!playing && <> {<PlayArrowIcon />} Run simulation</>}
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                if (playing) toggle();
                makeStep();
              }}
            >
              Make step
            </Button>
          </Grid>
        </Grid>
        <Grid item container justify="space-around">
          <Grid item>
            <Button variant="contained" color="primary" onClick={headLeft}>
              Head left
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={headRight}>
              Head right
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Controls;
