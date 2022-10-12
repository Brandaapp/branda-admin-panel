import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

export default function Confirmation (props) {
  const { name, open, handleConfirm, handleCancel } = props;

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'Delete Confirmation'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {`Are you sure you want to delete "${name}"`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary" autoFocus>
                    Cancel
        </Button>
        <Button onClick={handleConfirm} color="primary">
                    Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
