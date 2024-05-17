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
  
  const EditDialog = ({handleEditItem, oldName, desc, price}) => {
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
        <Button onClick={handleClickOpen}>
          Edit 
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
              handleEditItem(formJson.desc, formJson.price, oldName)
              handleClose();
            },
          }}
        >
          <DialogTitle>Edit item</DialogTitle>
          <DialogContent>
            <Typography>Description</Typography>
            <TextField
              autoFocus
              margin="dense"
              label="Description"
              name = "desc"
              rows={4}
              fullWidth
              multiline
              defaultValue={desc}
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
              defaultValue={price}
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
  
  export default EditDialog;
  