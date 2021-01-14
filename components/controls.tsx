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
import StateOverride from './state/state-override';
import { useSnackbar } from 'notistack';
import { AddInstruction } from './instructions';

const useStyles = makeStyles((theme) => ({
  spacing: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
  },
}));

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
    bestValidStep,
  } = useAppContext();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

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
    const validStep = bestValidStep;

    if (!validStep) {
      stopPlaying();
      enqueueSnackbar('Cannot find next valid step.', { variant: 'error' });
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
            <StateOverride />
          </Grid>
          <Grid item>
            <AddInstruction />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Controls;
