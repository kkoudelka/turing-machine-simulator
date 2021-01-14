import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useAppContext from '../../src/hooks';
import IInstruction from '../../src/models/instruction';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';

const AddInstruction: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { instructions, setInstructions } = useAppContext();

  const [newInstruction, setNewInstruction] = useState<IInstruction>({
    newstate: '',
    state: '',
    write: '',
    symbol: '',
    move: 'LEFT',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveInstruction = () => {
    handleClose();
    const newInstructions = [...instructions, newInstruction];
    setInstructions(newInstructions);
  };

  const disabled: boolean =
    newInstruction.newstate == '' ||
    newInstruction.state == '' ||
    newInstruction.symbol == '' ||
    instructions.find((x) => x == newInstruction) != null;

  return (
    <div>
      <Button
        variant="contained"
        size="small"
        color="primary"
        onClick={handleClickOpen}
      >
        Add new instruction
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add instruction</DialogTitle>
        <DialogContent>
          <DialogContentText>You can assign new state here</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="machine-state-new"
            autoComplete="off"
            label="If the machine state is"
            type="text"
            value={newInstruction.state}
            fullWidth
            onChange={(event) =>
              setNewInstruction({
                ...newInstruction,
                state: event.currentTarget.value,
              })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            id="machine-state-new"
            autoComplete="off"
            label="And the head reads"
            type="text"
            value={newInstruction.symbol}
            fullWidth
            onChange={(event) =>
              setNewInstruction({
                ...newInstruction,
                symbol: event.currentTarget.value,
              })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            id="machine-state-new"
            autoComplete="off"
            label="Machine writes"
            type="text"
            value={newInstruction.write}
            fullWidth
            onChange={(event) =>
              setNewInstruction({
                ...newInstruction,
                write: event.currentTarget.value,
              })
            }
          />
          <Grid
            container
            justify="space-between"
            alignContent="center"
            alignItems="center"
          >
            <Grid item>
              <DialogContentText>Head moves to the</DialogContentText>
            </Grid>
            <Grid item>
              <FormControlLabel
                value="start"
                control={
                  <Radio
                    checked={newInstruction.move === 'LEFT'}
                    onChange={(event) =>
                      setNewInstruction({
                        ...newInstruction,
                        move: 'LEFT',
                      })
                    }
                    value="LEFT"
                    name="radio-button-demo"
                  />
                }
                label="Left"
                labelPlacement="start"
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                value="end"
                control={
                  <Radio
                    checked={newInstruction.move === 'RIGHT'}
                    onChange={(event) =>
                      setNewInstruction({
                        ...newInstruction,
                        move: 'RIGHT',
                      })
                    }
                    value="RIGHT"
                    name="radio-button-demo"
                  />
                }
                label="Right"
                labelPlacement="end"
              />
            </Grid>
          </Grid>

          <TextField
            autoFocus
            margin="dense"
            id="machine-state-new"
            autoComplete="off"
            label="And sets its state to"
            type="text"
            value={newInstruction.newstate}
            fullWidth
            onChange={(event) =>
              setNewInstruction({
                ...newInstruction,
                newstate: event.currentTarget.value,
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={saveInstruction} color="primary" disabled={disabled}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddInstruction;
