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

const AddEditDialog = ({handleAddItem}) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
//   const [name, setName] = useState(''); 
//   const [description, setDescription] = useState('')
//   const [price, setPrice] = useState('')

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Add a new item
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            handleAddItem(formJson.name, formJson.desc, formJson.price)
            handleClose();
          },
        }}
      >
        <DialogTitle>Add item</DialogTitle>
        <DialogContent>
          <Typography>Item name</Typography>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            fullWidth
            variant="outlined"
            // onChange={(e)=>setName(e.target.value)}
          />
          <Typography>Description</Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Description"
            name = "desc"
            rows={4}
            fullWidth
            multiline
            // variant="outlined"
            // onChange={(e)=>setDescription(e.target.value)}
          />
          <Typography>Price</Typography>
          <TextField
            autoFocus
            margin="dense"
            label="$$"
            name="price"
            fullWidth
            variant="outlined"
            // onChange={(e)=>setPrice(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>Cancel</Button>
          <Button  variant="contained" type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddEditDialog;
