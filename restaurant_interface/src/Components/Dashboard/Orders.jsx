import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { Paper } from '@mui/material';
import { useAuthOwner } from '../../Context';
import axios from 'axios';
import BACKEND_URL from '../../config';
import ViewDialog from '../Order/ViewDialog';
// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    '16 Mar, 2019',
    'Elvis Presley',
    'Tupelo, MS',
    'VISA ⠀•••• 3719',
    312.44,
  ),
  createData(
    1,
    '16 Mar, 2019',
    'Paul McCartney',
    'London, UK',
    'VISA ⠀•••• 2574',
    866.99,
  ),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(
    3,
    '16 Mar, 2019',
    'Michael Jackson',
    'Gary, IN',
    'AMEX ⠀•••• 2000',
    654.39,
  ),
  createData(
    4,
    '15 Mar, 2019',
    'Bruce Springsteen',
    'Long Branch, NJ',
    'VISA ⠀•••• 5919',
    212.79,
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  const [orders, setOrders] = React.useState([]); 
  const {isAuthenticated} = useAuthOwner(); 

  const getPastOrders = async()=>{
    try {
      const response = await axios.get(`${BACKEND_URL}/api/owner/orders/history`, {
        headers: {
          Authorization: isAuthenticated
        }
      })
      setOrders(response.data);
      console.log('Past orders', response.data)
    } catch (error) {
      console.error(error);
    }
  }

  React.useEffect(()=>{
    getPastOrders()
  },[])
  return (
    <React.Fragment>
      <Paper sx={{ p: 2,display: "flex", flexDirection: "column" }}>

      <Title>Orders History</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Ship To</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell>Review</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Actions</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order, i) => (
            <TableRow key={i}>
              <TableCell>{order.orderDate}</TableCell>
              <TableCell>{order.recipientName}</TableCell>
              <TableCell>{order.orderLocation}</TableCell>
              <TableCell>{order.orderRating}</TableCell>
              <TableCell>{order.orderReview}</TableCell>
              <TableCell>{`$${order.orderCost}`}</TableCell>
              <TableCell>
                <ViewDialog
                oc = {order.orderCode}
                total= {order.orderCost}/>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
      </Paper>
    </React.Fragment>
  );
}