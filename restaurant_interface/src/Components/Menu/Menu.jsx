import React, { useEffect, useState } from "react";
import MenuCard from "./MenuCard";
import { Button, Grid, Paper, Typography } from "@mui/material";
import Title from "../Dashboard/Title";
import AddEditDialog from "./AddEditDialog";
import { useAuthOwner } from "../../Context";
import axios from "axios";
import BACKEND_URL from "../../config";
const Menu = () => {
  const [items, setItems] = useState([]);
  const { isAuthenticated } = useAuthOwner();

  const getMenuItems = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/owner/menu/view`, {
        headers: {
          Authorization: isAuthenticated,
        },
      });
      console.log(response.data);
      setItems(response.data.restaurantItems);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddItem = async (itemName, itemDes, itemPrice) => {
    try{
      const response = await axios.post(`${BACKEND_URL}/api/owner/edit/menu/add`, {
        itemName,
        itemDes,
        itemPrice
      }, {
        headers: {
          Authorization: isAuthenticated,
        }
      })

      console.log(itemName, itemDes, itemPrice);
      alert(response.data.message);
      // console.log(response);
      getMenuItems()
    }catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    getMenuItems();
  }, []);

  return (
    <div>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <Title>Menu list</Title>
        <AddEditDialog handleAddItem={handleAddItem}/>
        <Grid container spacing={2} marginTop={0} justifyContent="center">
          {items.map((item, i) => (
            <Grid key={i} item xs={4}>
              <MenuCard resCode={item.restaurantCode} 
              name = {item.itemName}
              desc = {item.itemDescription}
              price = {item.itemPrice}
              img = {item.itemIMG}
              refresh = {getMenuItems}/>
              
            </Grid>
          ))}
          
        </Grid>
        {/* <Button variant="contained">Add a new item</Button> */}
      </Paper>
    </div>
  );
};

export default Menu;
