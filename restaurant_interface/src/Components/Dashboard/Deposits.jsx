import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { useAuthOwner } from '../../Context';
import axios from 'axios';
import BACKEND_URL from '../../config';
function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  const {startDate, endDate, isAuthenticated, revenue} = useAuthOwner();
  // const [revenue, setRevenue] = React.useState()
  // const getRevenue = async(startDate, endDate)=>{
  //   try {
  //     const response = await axios.get(`${BACKEND_URL}/api/owner/revenue`, {
  //       headers: {
  //         Authorization: isAuthenticated
  //       }, 
  //       params: {
  //         startDate, 
  //         endDate
  //       }
  //     })
  //     setRevenue(response.data.totalRevenue)
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  // React.useEffect(()=>{
  //   getRevenue(startDate, endDate);
  // },[startDate||endDate])
  return (
    <React.Fragment>
      <Title>Recent Revenue</Title>
      <Typography component="p" variant="h4">
        $ {revenue}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {startDate} to {endDate}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}