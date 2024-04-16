import React, { useEffect, useState } from 'react'
import MenuItem from '../components/MenuItem'
import { RestaurantInfo } from '../components/RestaurantInfo'
import banner from '../assets/Images/GYG.jpeg'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../Context'
import NavBar from '../components/NavBar'
const Menu = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search); // Get search parameters from URL
  const [restaurantInfo, setRestaurantInfo] = useState({});
  const [Items, setItems] = useState([])
  const {isAuthenticated, setTotalItems} = useAuth()
  const name = searchParams.get('name');
  // console.log("Name:", name);
  console.log(restaurantInfo)
  console.log(Items)

  // Handle add selected item
  const handleAdd = async (restaurantCode, itemName, itemPrice) => {
    try {
      // Make POST request to the API endpoint
      const response = await axios.post('http://localhost:4000/api/customer/cart/add', {
        restaurantCode: restaurantCode,
        itemName: itemName,
        itemPrice: itemPrice
      }, {
        headers: {
          Authorization: isAuthenticated
        }
      });

      // Return the total number of items in the cart
      console.log("Total items : " + response.data)
      setTotalItems(response.data)
    } catch (error) {
      // Handle errors
      alert(error.response.data.error)
      throw new Error(error.response.data.error);
    }
  };

  const fetchRestaurantMenu = async (restaurantName) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/restaurant/${restaurantName}`);
      setRestaurantInfo(response.data.restaurantInformation)
      setItems(response.data.restaurantItems)
      console.log(response.data)

      return response.data;
    } catch (error) {
      console.error('Error fetching restaurant menu:', error);
      throw error; // Re-throw the error to handle it in the calling code
    }
  };

  useEffect (()=>{
    fetchRestaurantMenu(name); 
  } , [])

  return (
    <div className='flex flex-col items-center '>
      <NavBar/>
      {/* Restaurant Banner */}
      <img className='h-[300px] w-full' src={banner} alt="" />

      {/* Restaurant info */}
      <RestaurantInfo info = {restaurantInfo}/>

      <div className='w-full flex flex-col items-center mt-10'>
        {Items.map((item, index)=>(
          <MenuItem key={index} 
                    restaurantCode= {item.restaurantCode}
                    name={item.itemName} 
                    price ={item.itemPrice}
                    image = {item.itemIMG}
                    handleAdd = {handleAdd}/>
        ))}
        

      </div>


    </div>
  )
}

export default Menu