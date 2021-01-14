import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { sampleInstructions } from '../src/models';
import { Button, Grid, Typography } from '@material-ui/core';
import useAppContext from '../src/hooks';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  container: {
    maxHeight: 500,
  },
  spacing: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
  },
  canDoThis: {
    backgroundColor: '#FDE74C',
  },
  lastSuccess: {
    backgroundColor: '#9BC53D !important',
  },
}));

const StateInfo: React.FC = () => {
  const classes = useStyles();
  const { canDoThis, lastSuccess } = classes;
  const {
    currentInstruction,
    instructions,
    setInstructions,
    bestValidStep,
  } = useAppContext();

  return (
    <>
      <Paper className={classes.spacing}>
        <Typography>Instructions</Typography>
        <Typography variant="body2">
          Yellow - currently possible operation | Green - last successful
          operation
        </Typography>
        <br />
        <TableContainer component={Paper} className={classes.container}>
          <Table
            stickyHeader
            className={classes.table}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="center">State</TableCell>
                <TableCell align="center">Symbol</TableCell>
                <TableCell align="center">Write</TableCell>
                <TableCell align="center">Move</TableCell>
                <TableCell align="center">New state</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {instructions.map((row, index) => (
                <TableRow
                  id={`instruction-${index}`}
                  key={`instruction-${index}`}
                  className={clsx({
                    [canDoThis]: bestValidStep === row,
                    [lastSuccess]: row === currentInstruction,
                  })}
                >
                  <TableCell align="center" component="th" scope="row">
                    {row.state}
                  </TableCell>
                  <TableCell align="center">{row.symbol}</TableCell>
                  <TableCell align="center">{row.write}</TableCell>
                  <TableCell align="center">{row.move}</TableCell>
                  <TableCell align="center">{row.newstate}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      aria-label="delete"
                      size="small"
                      onClick={() => {
                        setInstructions(instructions.filter((x) => x !== row));
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default StateInfo;
