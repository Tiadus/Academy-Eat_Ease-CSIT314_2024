import React, { useEffect, useState } from 'react'
import Item from '../components/CartItem'
import { CartDialog } from '../components/CardDialog'
import { useAuth } from '../Context';
import axios from 'axios';
import {Button} from '@material-tailwind/react'
import NavBar from '../components/NavBar';
const Cart = () => {
  const { isAuthenticated, totalItems, setTotalItems ,lat, lon} = useAuth();
  const [cart, setCart] = useState({})


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
      return response.data
    } catch (error) {
      // Handle errors
      throw new Error(error.response.data.error);
    }
  };

  //Handle update quantity of selected item
  const handleUpdate = async (name, quantity)=> {
    try {
      const respone = await axios.post('http://localhost:4000/api/customer/cart/update', {
        itemName : name, 
        itemQuantity: quantity
      }, {
        headers: {
          Authorization: isAuthenticated
        }
      })
      fetchData();
      console.log(respone.data)
      setTotalItems(respone.data)
      return respone.data
    }
    catch (error) { 
      throw new Error(error.response.data.error|| 'Something went wrong')
    }
  
  }

  // Handle delete selected item
  const handleDelete = async () => {
    try {
      // Make POST request to the API endpoint
      const response = await axios.post('http://localhost:4000/api/customer/cart/delete', {}, {
        headers: {
          Authorization: isAuthenticated
        }
      });

      // Return the total number of items in the cart
      setTotalItems(0)
      setCart({})
      return response.data;
    } catch (error) {
      // Handle errors
      throw new Error(error.response.data.error);
    }
  };



  const fetchData = async () => {
    try {
      // const lat = '-34.408909';
      // const lon = '150.8854373';
      console.log('lat: ' + lat + ' lon: ' + lon);
      console.log(isAuthenticated)

      const response = await axios.get(`http://localhost:4000/api/customer/cart/view`, {
        params: {
          lat: lat,
          lon: lon
        },

        headers: {
          authorization: isAuthenticated
        }
      });
      console.log("Cart: ", response.data)
      setCart(response.data)
    } catch (e) {
      console.log(e.response)
    }
  }
  useEffect(() => {
    fetchData()
  }, [totalItems])
  return (
    <>
    <NavBar/>
    <div className=' grid grid-cols-3'>
      <div className=' col-span-2'>
        <p className=' text-3xl m-[50px]'>Review Cart</p>
        {Object.keys(cart).length > 0  ? cart.items.map((item,index) => (
          <Item
            key = {index}
            name={item.itemName}
            price={item.itemPrice}
            quantity={item.itemQuantity}
            image={item.itemIMG}
            restaurantCode={cart.restaurantCode}
            handleAdd={handleAdd}
            handleDelete={handleDelete} 
            handleUpdate= {handleUpdate}/>
        )) : <p>Cart is empty</p>}
        <Button className='ml-12' onClick = {()=>handleDelete()}>Delete Cart</Button>
      </div>

      <div className=' flex flex-col  rounded-lg items-center  m-[50px] mt-[136px] shadow-xl	'>
        <p className='text-3xl font-semibold mt-5'>Summary</p>
        {Object.keys(cart).length > 0  ? <p className='text-xl m-2'>{cart.restaurantName}</p> : <p>Unknown</p>}
        {Object.keys(cart).length > 0  ? <div className=' grid grid-cols-3 w-full h-3/5 ml-20 text-xl items-center '>
          <div className='col-span-2'>Price </div> <p className='col-span-1'>{cart.costs.totalItemCost}$</p>
          <div className='col-span-2'>Delivery Fee</div> <p className='col-span-1'>{cart.costs.deliveryCost}$</p>
          <div className='col-span-2'>Discount Percentage</div><p className='col-span-1'>{cart.costs.discountPercentage}%</p>
          <hr className='col-span-3 w-4/5' />
          <div className='col-span-2'>Total price </div><p className='col-span-1'>{cart.costs.finalCost}$</p>
        </div> :
          <div className=' grid grid-cols-3 w-full h-3/5 ml-20 text-xl items-center '>
            <div className='col-span-2'>Price </div> <p className='col-span-1'>0$</p>
            <div className='col-span-2'>Delivery Fee</div> <p className='col-span-1'>0$</p>
            <div className='col-span-2'>Discount Percentage</div><p className='col-span-1'>0%</p>
            <hr className='col-span-3 w-4/5' />
            <div className='col-span-2'>Total price </div><p className='col-span-1'>0$</p>
          </div>}

        <CartDialog totalCost = {Object.keys(cart).length > 0  ? cart.costs.finalCost:0}/>
      </div>


    </div>
    </>
  )
}

export default Cart