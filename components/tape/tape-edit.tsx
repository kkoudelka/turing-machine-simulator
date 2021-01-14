import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useAppContext from '../../src/hooks';

const TapeEditor: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { tape, setNewTape } = useAppContext();

  const tapeCurrent = tape.map((x) => (x === '_' ? ' ' : x)).join('');

  const [newTape, sNT] = useState(tapeCurrent);

  useEffect(() => {
    sNT(tapeCurrent);
  }, [tapeCurrent]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveTape = () => {
    handleClose();
    const newT: string[] = [];
    for (const l of newTape) {
      newT.push(l === ' ' ? '_' : l);
    }
    setNewTape(newT);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Edit tape
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Tape editor</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can edit the tape here. Each character will be treated as one
            cell.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="tape"
            autoComplete="off"
            label="Tape value"
            type="text"
            value={newTape}
            fullWidth
            onChange={(event) => sNT(event.currentTarget.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={saveTape} color="primary">
            Save tape
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TapeEditor;
