import React from "react";
import MenuCard from "./MenuCard";
import { Button, Grid, Paper, Typography } from "@mui/material";
import Title from "../Dashboard/Title";
import AddEditDialog from "./AddEditDialog";

const Menu = () => {
  return (
    <div>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <Title>Menu list</Title>
        <AddEditDialog/>
        <Grid container xs={12} spacing={2} marginTop={0} justifyContent="center">
          <Grid item xs={4}>
            <MenuCard />
          </Grid>
          <Grid item xs={4}>
            <MenuCard />
          </Grid>
          <Grid item xs={4}>
            <MenuCard />
          </Grid>
          <Grid item xs={4}>
            <MenuCard />
          </Grid>
          <Grid item xs={4}>
            <MenuCard />
          </Grid>
          <Grid item xs={4}>
            <MenuCard />
          </Grid>
        </Grid>
        {/* <Button variant="contained">Add a new item</Button> */}
      </Paper>
    </div>
  );
};

export default Menu;
