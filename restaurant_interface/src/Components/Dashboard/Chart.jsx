import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { LineChart, axisClasses } from "@mui/x-charts";
import dayjs from "dayjs";
import axios from "axios";
import Title from "./Title";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, Grid } from "@mui/material";
import { useAuthOwner } from "../../Context";
import BACKEND_URL from "../../config";
// Generate Sales Data
function createData(time, amount) {
  return { time, amount: amount ?? null };
}

const data = [
  createData("00:00", 0),
  createData("03:00", 300),
  createData("06:00", 600),
  createData("09:00", 800),
  createData("12:00", 1500),
  createData("15:00", 2000),
  createData("18:00", 2400),
  createData("21:00", 2400),
  createData("24:00"),
];

export default function Chart() {
  const theme = useTheme();
  const {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    isAuthenticated,
    setRevenue,
    revenue,
  } = useAuthOwner();
  const getRevenue = async (startDate, endDate) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/owner/revenue`, {
        headers: {
          Authorization: isAuthenticated,
        },
        params: {
          startDate,
          endDate,
        },
      });
      setRevenue(response.data.totalRevenue);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(startDate, endDate);
  return (
    <React.Fragment>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid container>
          <Grid item xs={3}>
            <Title>Today</Title>
          </Grid>
          <Grid item xs={4}>
            <DatePicker
              // value={dayjs("2024-03-16")}
              onChange={(newValue) =>
                setStartDate(`${newValue.$y}-${newValue.$M + 1}-${newValue.$D}`)
              }
            />
          </Grid>
          <Grid item xs={4}>
            <DatePicker
              // value={dayjs("2024-04-25")}
              onChange={(newValue) =>
                setEndDate(`${newValue.$y}-${newValue.$M + 1}-${newValue.$D}`)
              }
            />
          </Grid>
          <Grid item xs={1}>
            <Button
              onClick={() => getRevenue(startDate, endDate)}
              variant="contained"
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </LocalizationProvider>

      <div style={{ width: "100%", flexGrow: 1, overflow: "hidden" }}>
        <LineChart
          dataset={data}
          margin={{
            top: 16,
            right: 20,
            left: 70,
            bottom: 30,
          }}
          xAxis={[
            {
              scaleType: "point",
              dataKey: "time",
              tickNumber: 2,
              tickLabelStyle: theme.typography.body2,
            },
          ]}
          yAxis={[
            {
              label: "Sales ($)",
              labelStyle: {
                ...theme.typography.body1,
                fill: theme.palette.text.primary,
              },
              tickLabelStyle: theme.typography.body2,
              max: 2500,
              tickNumber: 3,
            },
          ]}
          series={[
            {
              dataKey: "amount",
              showMark: false,
              color: theme.palette.primary.light,
            },
          ]}
          sx={{
            [`.${axisClasses.root} line`]: {
              stroke: theme.palette.text.secondary,
            },
            [`.${axisClasses.root} text`]: {
              fill: theme.palette.text.secondary,
            },
            [`& .${axisClasses.left} .${axisClasses.label}`]: {
              transform: "translateX(-25px)",
            },
          }}
        />
      </div>
    </React.Fragment>
  );
}
