import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
  Typography
} from "@mui/material";
import { React, useState } from "react";

const AddEditDialog = () => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Add a new item
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth="medium"
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Edit item</DialogTitle>
        <DialogContent>
          <Typography>Item name</Typography>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Name"
            fullWidth
            variant="outlined"
          />
          <Typography>Description</Typography>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Description"
            rows={4}
            fullWidth
            multiline
            // variant="outlined"
          />
          <Typography>Price</Typography>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="$$"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>Cancel</Button>
          <Button variant="contained" type="submit">Save changes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddEditDialog;
