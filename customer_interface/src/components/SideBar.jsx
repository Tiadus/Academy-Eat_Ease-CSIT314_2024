import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
  } from "@material-tailwind/react";
  
  import { BiSolidEditLocation, BiSolidUserDetail } from "react-icons/bi";
  import { IoReceipt } from "react-icons/io5";
  import { FaUsers } from "react-icons/fa";
  import { FaCreditCard } from "react-icons/fa6";
  import { IoDocumentTextSharp } from "react-icons/io5";
  import { LuLogOut } from "react-icons/lu";
  import {useNavigate} from "react-router-dom"
  import React from "react";
  import { useAuth } from '../Context';
   
  export function Sidebar({onOptionClick}) {
    const { location, setLocation} = useAuth();

    React.useEffect(() => {
      if (location.displayAddress === undefined) {
        navigate("/");
      }
    }, [location])

    const navigate = useNavigate();
    return (
      <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray">
            PROFILE
          </Typography>
        </div>
        <List>
          <ListItem onClick={()=>onOptionClick('Details')}> 
            <ListItemPrefix>
            <BiSolidUserDetail className="h-5 w-5" />
            </ListItemPrefix>
            Details
          </ListItem>
          <ListItem onClick={()=>onOptionClick('Orders')}>
            <ListItemPrefix>
            <IoReceipt className="h-5 w-5" />
            </ListItemPrefix>
            Orders
          </ListItem>
          <ListItem onClick={()=>onOptionClick('Membership')}>
            <ListItemPrefix>
            <FaUsers className="h-5 w-5" />
            </ListItemPrefix>
            Membership
            {/* <ListItemSuffix>
              <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
            </ListItemSuffix> */}
          </ListItem>
          <ListItem onClick={()=>onOptionClick('Payment')}>
            <ListItemPrefix>
            <FaCreditCard className="h-5 w-5" />
            </ListItemPrefix>
            Payment
          </ListItem>
          <ListItem onClick={()=>onOptionClick('Transactions')}>
            <ListItemPrefix>
            <IoDocumentTextSharp className="h-5 w-5"/>
            </ListItemPrefix>
            Transactions
          </ListItem>
          <ListItem onClick={
            ()=> {
              setLocation({})
            }
            }>
            <ListItemPrefix>
            <LuLogOut className="h-5 w-5"/>
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </Card>
    );
  }