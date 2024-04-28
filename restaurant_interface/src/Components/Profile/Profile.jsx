import {
  Button,
  Divider,
  Grid,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React from "react";
import Title from "../Dashboard/Title";

const Profile = () => {
  return (
    <div className="">
      <Title>Details</Title>

      <Grid container spacing={2}>
        <Grid item xs={6} container spacing={2} >
          <Grid item xs={12}>
            <Typography>Name</Typography>
          </Grid>
          <Grid item xs={12} >
            <TextField
              id="outlined-basic"
              value="Restaurant1"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={2}>
            <Button variant="outlined">Save</Button>
          </Grid>
        </Grid>
        
        <Grid item xs={6} container spacing={2} >
          <Grid item xs={12}>
            <Typography>Phone</Typography>
          </Grid>
          <Grid item xs={12} >
            <TextField
              id="outlined-basic"
              value="Restaurant1"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={2}>
            <Button variant="outlined">Save</Button>
          </Grid>
        </Grid>
        <Grid item xs={6} container spacing={2} >
          <Grid item xs={12}>
            <Typography>Email</Typography>
          </Grid>
          <Grid item xs={12} >
            <TextField
              id="outlined-basic"
              value="Restaurant1"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={2}>
            <Button variant="outlined">Save</Button>
          </Grid>
        </Grid>
        <Grid item xs={6} container spacing={2} >
          <Grid item xs={12}>
            <Typography>Address</Typography>
          </Grid>
          <Grid item xs={12} >
            <TextField
              id="outlined-basic"
              value="Restaurant1"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={2}>
            <Button variant="outlined">Save</Button>
          </Grid>
        </Grid>
        <Grid item xs={6} container spacing={2} >
          <Grid item xs={12}>
            <Typography>Password</Typography>
          </Grid>
          <Grid item xs={12} >
            <TextField
              id="outlined-basic"
              value="Restaurant1"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={2}>
            <Button variant="outlined">Save</Button>
          </Grid>
        </Grid>
        <Grid item xs={6} container spacing={2} >
          <Grid item xs={12}>
            <Typography>Confirm password</Typography>
          </Grid>
          <Grid item xs={12} >
            <TextField
              id="outlined-basic"
              value="Restaurant1"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={2}>
            <Button variant="outlined">Save</Button>
          </Grid>
        </Grid>
        
      </Grid>
      <Divider />
      <Title>Bank Details</Title>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography>Description</Typography>
          <TextField
            id="outlined-multiline-static"
            label=""
            multiline
            rows={4}
            defaultValue="Description"
            fullWidth
            margin="normal"
          />
          <Button variant="outlined">Save</Button>
        </Grid>
        <Grid item xs={6}>
          <Typography>ABN</Typography>
          <TextField
            id="outlined-basic"
            value="Restaurant1"
            variant="outlined"
          />
          <Button variant="outlined">Save</Button>
        </Grid>
        <Grid item xs={6}>
          <Typography>Bank</Typography>
          <TextField
            id="outlined-basic"
            value="Restaurant1"
            variant="outlined"
          />
          <Button variant="outlined">Save</Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
