import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import BarChartIcon from "@mui/icons-material/BarChart";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import { useAuthOwner } from "../../Context";
const ListItems = ({onOptionClick}) => {
  const navigate = useNavigate()
  const {user, setAuthUser} = useAuthOwner()

  //When the user is logout, meaning their detail is cleared, this navigate the user to the SignIn page.
  React.useEffect(() => {
    if (user.restaurantCode === undefined) {
      navigate('/');
    }
  }, [user])

  return (
    <React.Fragment>
    <ListItemButton onClick={()=>onOptionClick('Dashboard')}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton onClick={()=>onOptionClick('Orders')}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItemButton>
    <ListItemButton onClick={()=>onOptionClick('Menu')}>
      <ListItemIcon>
        <RestaurantMenuIcon />
      </ListItemIcon>
      <ListItemText primary="Menu" />
    </ListItemButton>
    
    <ListItemButton onClick={()=>onOptionClick('Profile')}>
      <ListItemIcon>
        <AccountBoxIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItemButton>
    <ListItemButton onClick={()=>{
      //Clearing the detail and credential of user
          setAuthUser({
            auth: null,
            userData: {}
          });
      }}>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Log out" />
    </ListItemButton>
  </React.Fragment>  )
}

export default ListItems
