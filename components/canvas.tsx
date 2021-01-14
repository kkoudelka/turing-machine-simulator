import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import useAppContext from '../src/hooks';

const useStyles = makeStyles({
  spacing: {
    marginTop: '1rem',
    marginBottom: '1rem',
    padding: '1rem',
  },
  table: {},
  cell: {
    width: '20px',
    height: '20px',
    textAlign: 'center',
    verticalAlign: 'center',
    border: '1px solid black',
  },
  cellNoBorder: {
    width: '20px',
    height: '20px',
    textAlign: 'center',
    verticalAlign: 'center',
  },
});

const MachineCanvas: React.FC = () => {
  const classes = useStyles();

  const { line, headIndex } = useAppContext();
  const currentIndex = headIndex + 1;
  const headArr = Array.from(Array(currentIndex));

  return (
    <Paper className={classes.spacing}>
      {line.length == 0 && <Typography>Nothing to display</Typography>}
      {line.length > 0 && (
        <>
          <table className={classes.table}>
            <tbody>
              <tr>
                {line.map((x, index) => (
                  <td key={`machine-cell-${index}`} className={classes.cell}>
                    {x}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
          <table>
            <tbody>
              <tr>
                {headArr.map((x, index) => (
                  <td
                    key={`machine-head-${index}`}
                    className={classes.cellNoBorder}
                  >
                    {headIndex == index && <ArrowDropUpIcon />}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </>
      )}
    </Paper>
  );
};

export default MachineCanvas;
