import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import useAppContext from '../src/hooks';
import { TapeEditor } from './tape';

const useStyles = makeStyles((theme) => ({
  spacing: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
  },
  tableContainer: {
    overflowX: 'auto',
    width: '100%',
  },
  table: {},
  cell: {
    width: '30px',
    height: '30px',
    minWidth: '30px',
    textAlign: 'center',
    verticalAlign: 'center',
    border: '1px solid black',
  },
  cellNoBorder: {
    width: '30px',
    height: '30px',
    textAlign: 'center',
    verticalAlign: 'center',
    minWidth: '30px',
  },
}));

const MachineCanvas: React.FC = () => {
  const classes = useStyles();

  const { tape, headIndex } = useAppContext();
  const currentIndex = headIndex + 1;
  const headArr = Array.from(Array(currentIndex));

  return (
    <Paper className={classes.spacing}>
      {tape.length == 0 && <Typography>Nothing to display</Typography>}
      {tape.length > 0 && (
        <>
          <div className={classes.tableContainer}>
            <table className={classes.table}>
              <tbody>
                <tr>
                  {tape.map((x, index) => (
                    <td key={`machine-cell-${index}`} className={classes.cell}>
                      <Typography>{x}</Typography>
                    </td>
                  ))}
                </tr>
                <tr>
                  {headArr.map((x, index) => (
                    <td
                      key={`machine-head-${index}`}
                      className={classes.cellNoBorder}
                    >
                      {headIndex == index && (
                        <div id="machine-head">
                          <ArrowDropUpIcon />
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
      <TapeEditor />
    </Paper>
  );
};

export default MachineCanvas;
