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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  container: {
    maxHeight: 440,
  },
});

const StateInfo: React.FC = () => {
  const classes = useStyles();
  const { currentInstruction, instructions } = useAppContext();

  return (
    <>
      <TableContainer component={Paper} className={classes.container}>
        <Table stickyHeader className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">State</TableCell>
              <TableCell align="center">Symbol</TableCell>
              <TableCell align="center">Write</TableCell>
              <TableCell align="center">Move</TableCell>
              <TableCell align="center">New state</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {instructions.map((row, index) => (
              <TableRow
                key={`instruction-${index}`}
                selected={row == currentInstruction}
              >
                <TableCell align="center" component="th" scope="row">
                  {row.state}
                </TableCell>
                <TableCell align="center">{row.symbol}</TableCell>
                <TableCell align="center">{row.write}</TableCell>
                <TableCell align="center">{row.move}</TableCell>
                <TableCell align="center">{row.newstate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default StateInfo;
