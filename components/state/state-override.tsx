import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useAppContext from '../../src/hooks';

const StateOverride: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { machineState, setMachineState } = useAppContext();

  const [newState, setNewState] = useState(machineState);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveState = () => {
    handleClose();
    setMachineState(newState);
  };

  return (
    <div>
      <Button
        variant="contained"
        size="small"
        color="primary"
        onClick={handleClickOpen}
      >
        Override state
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Override state</DialogTitle>
        <DialogContent>
          <DialogContentText>You can assign new state here</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="machine-state-new"
            autoComplete="off"
            label="Assign new state"
            type="text"
            value={newState}
            fullWidth
            onChange={(event) => setNewState(event.currentTarget.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={saveState} color="primary">
            Save new state
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StateOverride;
