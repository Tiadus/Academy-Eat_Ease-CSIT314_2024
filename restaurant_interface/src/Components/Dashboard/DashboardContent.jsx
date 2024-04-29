import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chart from "./Chart";
import Deposits from "./Deposits";
import Orders from "./Orders";
import { useAuthOwner } from "../../Context";
import BACKEND_URL from "../../config";
import axios from "axios";
import OrdersTable from "../Order/OrdersTable";
const DashboardContent = () => {
  const {isAuthenticated} = useAuthOwner(); 
  
  return (
    <Grid container spacing={3}>
      {/* Chart */}
      <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 240,
          }}
        >
          <Chart />
        </Paper>
      </Grid>
      {/* Recent Deposits */}
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 240,
          }}
        >
          <Deposits />
        </Paper>
      </Grid>
      {/* Recent Orders */}
      <Grid item xs={12}>
          {/* <Orders /> */}
          <OrdersTable/>
      </Grid>
    </Grid>
  );
};

export default DashboardContent;
