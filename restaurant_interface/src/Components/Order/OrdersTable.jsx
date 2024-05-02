import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../Dashboard/Title";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Paper,
  Tab,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useAuthOwner } from "../../Context";
import BACKEND_URL from "../../config";
import CancelDialog from "./CancelDialog";
import ViewDialog from "./ViewDialog";
import { SnackbarProvider, useSnackbar } from "notistack";
import Snackbar from '@mui/material/Snackbar';

function preventDefault(event) {
  event.preventDefault();
}

export default function OrdersTable() {
  const { isAuthenticated, user } = useAuthOwner();
  const [orders, setOrders] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [activeOrders, setActiveOrders] = React.useState([]);
  const [messages, setMessages] = React.useState();
  const [isConnected, setIsConnected] = React.useState(false);
  // console.log(user.restaurantCode)
  const [webSocket, setWS] = React.useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const connectWebSocket = () => {
    const ws = new WebSocket("ws://localhost:4000");

    ws.onopen = () => {
      console.log("WebSocket connection opened");
      ws.send(user.restaurantCode);
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      const message = event.data;
      // alert("New order is coming÷, reload to see the latest order");
      console.log(message);
      // enqueueSnackbar("New order is coming!");
      handleClick();
      getIncomingOrder();
      setMessages(message);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
      setIsConnected(false);
      setWS(null); // Reset the instance
    };

    setWS(ws);
  };

  const getIncomingOrder = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/owner/orders/incoming`,
        {
          headers: {
            Authorization: isAuthenticated,
          },
        }
      );
      setOrders(response.data);
      console.log("incoming Orders: ", response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getActiveOrder = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/owner/orders/active`,
        {
          headers: {
            Authorization: isAuthenticated,
          },
        }
      );
      setActiveOrders(response.data);
      console.log("active orders:", response.data);
    } catch (e) {
      console.log(e);
    }
  };
  const handleApproveOrder = async (oc) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/owner/order/accept`,
        {
          oc,
        },
        {
          headers: {
            Authorization: isAuthenticated,
          },
        }
      );
      getIncomingOrder();
      getActiveOrder();
      alert(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelOrder = async (oc, rejectReason) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/owner/order/reject`,
        {
          oc,
          rejectReason,
        },
        {
          headers: {
            Authorization: isAuthenticated,
          },
        }
      );
      getIncomingOrder();
      // enqueueSnackbar('test', 'success');
      alert(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    connectWebSocket();
    getIncomingOrder();
    getActiveOrder();
  }, []);
  return (
    <SnackbarProvider maxSnack={5}>
      <React.Fragment>
        <Paper
          sx={{ p: 2, margin: 2, display: "flex", flexDirection: "column" }}
        >
          <Title>Active Orders</Title>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Ship To</TableCell>
                <TableCell>Order Code </TableCell>
                <TableCell>Sale Amount</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {activeOrders.map((order, i) => (
                <TableRow key={i}>
                  <TableCell>{order.orderDate}</TableCell>
                  <TableCell>{order.recipientName}</TableCell>
                  <TableCell>{order.orderLocation}</TableCell>
                  <TableCell>{order.orderCode}</TableCell>
                  <TableCell>{`$${order.orderCost}`}</TableCell>
                  <TableCell align="center">
                    {/* <Button onClick={() => handleApproveOrder(order.orderCode)}>
                    Approve
                    </Button>
                    <CancelDialog
                    handleCancelOrder={handleCancelOrder}
                    oc={order.orderCode}
                  /> */}
                    <ViewDialog
                      oc={order.orderCode}
                      refresh={getIncomingOrder}
                      total={order.orderCost}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Link
            color="primary"
            href="#"
            onClick={preventDefault}
            sx={{ mt: 3 }}
          >
            See more orders
          </Link>
        </Paper>

        <Paper
          sx={{ p: 2, margin: 2, display: "flex", flexDirection: "column" }}
        >
          <Title>Incoming Orders</Title>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Ship To</TableCell>
                <TableCell>Order Code </TableCell>
                <TableCell>Sale Amount</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order, i) => (
                <TableRow key={i}>
                  <TableCell>{order.orderDate}</TableCell>
                  <TableCell>{order.recipientName}</TableCell>
                  <TableCell>{order.orderLocation}</TableCell>
                  <TableCell>{order.orderCode}</TableCell>
                  <TableCell>{`$${order.orderCost}`}</TableCell>
                  <TableCell align="center">
                    <Button onClick={() => handleApproveOrder(order.orderCode)}>
                      Approve
                    </Button>
                    <CancelDialog
                      handleCancelOrder={handleCancelOrder}
                      oc={order.orderCode}
                    />
                    <ViewDialog
                      oc={order.orderCode}
                      refresh={getIncomingOrder}
                      total={order.orderCost}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Link
            color="primary"
            href="#"
            onClick={handleClick}
            sx={{ mt: 3 }}
          >
            See more orders
          </Link>
        </Paper>
        <Snackbar
        open={open}
        autoHideDuration={10000}
        onClose={handleClose}
        message="New order is coming "
      />
      </React.Fragment>
    </SnackbarProvider>
  );
}
