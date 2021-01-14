import { Paper, Grid, Typography, Button } from '@material-ui/core';
import React, { useState } from 'react';
import useAppContext from '../src/hooks';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import { makeStyles } from '@material-ui/core/styles';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import { useRouter } from 'next/router';

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

  const router = useRouter();

  const [playing, setPlaying] = useState(false);

  const classes = useStyles();

  const toggle = () => {
    if (playing) stopPlaying();
    else startPlaying();
  };

  const startPlaying = () => {
    setPlaying(true);
    makeStep();
  };

  const stopPlaying = () => {
    setPlaying(false);
  };

  const handleScroll = (index: number) => {
    const anchor = document.querySelector(`#instruction-${index}`);

    setTimeout(() => {
      if (anchor) {
        anchor.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    }, 10);
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

    const index = instructions.indexOf(validStep);
    handleScroll(index);

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
          {/* <Grid item>
            <Button variant="contained" color="primary" onClick={toggle}>
              {playing && <> {<PauseIcon />} Pause simulation</>}
              {!playing && <> {<PlayArrowIcon />} Run simulation</>}
            </Button>
          </Grid> */}
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                if (playing) stopPlaying();
                makeStep();
              }}
            >
              Make step
            </Button>
          </Grid>
        </Grid>
        <Grid item container justify="space-around">
          <Grid item>
            <Button
              variant="contained"
              size="small"
              color="primary"
              onClick={headLeft}
            >
              <ArrowLeftIcon /> Head left
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              size="small"
              color="primary"
              onClick={headRight}
            >
              Head right <ArrowRightIcon />
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              size="small"
              color="primary"
              onClick={() => window.location.reload()}
            >
              <SettingsBackupRestoreIcon /> Reset
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Controls;
