import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import BACKEND_URL from "../../config";
import { useAuthOwner } from "../../Context";
import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from "@mui/material";
export default function ViewDialog({ oc, refresh, total }) {
  const [open, setOpen] = React.useState(false);
  const { isAuthenticated } = useAuthOwner();
  const [items, setItems] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleGetOrderDetail = async (oc) => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/owner/order/view`,

        {
          headers: {
            Authorization: isAuthenticated,
          },
          params: {
            oc,
          },
        }
      );
      console.log(response);
      setItems(response.data.orderItems);
      refresh();
    } catch (error) {
      console.log(error);
    }
  };

  //   React.useEffect(()=>{
  //     handleGetOrderDetail(oc)
  //   },[])
  return (
    <React.Fragment>
      <Button
        onClick={() => {
          handleClickOpen();
          handleGetOrderDetail(oc);
        }}
      >
        View
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle> Order detail</DialogTitle>
        <DialogContent>
          <DialogContentText>List of order items</DialogContentText>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Unit price </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, i) => (
                <TableRow key={i}>
                  <TableCell>{item.itemName}</TableCell>
                  <TableCell>$ {item.itemPrice}</TableCell>
                  <TableCell>{item.itemQuantity}</TableCell>
                  <TableCell>$ {item.totalUnitPrice}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            </Table>
          <DialogContentText>Total cost: $ {total}</DialogContentText>

        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
