import  React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import image from "../../../public/Images/Thai1.jpg"
import EditDialog from './EditDialog';
import axios from "axios"
import BACKEND_URL from '../../config';
import { useAuthOwner } from '../../Context';
export default function MenuCard({resCode, name, desc, price, img, refresh}) {
  const urlImg = `http://localhost:4000/${img}`

  const {isAuthenticated} = useAuthOwner(); 

  const handleEditItem = async (itemDes, itemPrice, oldItemName)=> {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/owner/edit/item`,{
        itemDes,
        itemPrice, 
        oldItemName
      }, {
        headers: {
          Authorization: isAuthenticated
        }
      })

      console.log(response.data)
      refresh()
    }catch(e){
      console.log(e.message)
    }

  }
  const handleDeleteItem = async (itemName)=> {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/owner/edit/menu/del`, {
        itemName
      }, {
        headers: {
          Authorization: isAuthenticated
        }
      })
      console.log(response.data);
      refresh(); 
    }catch(e){
      console.log(e)
    }
  }
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="Item image"
        height="140"
        src={urlImg} 
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
         {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {desc}
        </Typography>
        <Typography>
          {price}$
        </Typography>
      </CardContent>
      <CardActions>
        {/* <Button size="small">Edit</Button> */}
        <EditDialog oldName={name} desc={desc} price={price} handleEditItem={handleEditItem}/>
        <Button onClick={()=>handleDeleteItem(name)} size="small">Delete</Button>
      </CardActions>
    </Card>
  );
}
