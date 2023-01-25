import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Link from 'next/link';

export default function DeleteModal ({ open, setOpen, club, onDelete }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Are you sure you want to delete "${club}"?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Once deleted, you cannot undo this action, although you can re-add it as a new club.
            For more information, please email{' '}
            <Link href='mailto: brandaapp@gmail.com'>brandaapp@gmail.com</Link>.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>Cancel</Button>
          <Button onClick={onDelete} sx={{ color: 'red' }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
