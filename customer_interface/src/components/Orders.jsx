import React, { useEffect, useState } from 'react'
import image from '../assets/Images/FriedRice.png'
import axios from 'axios'
import { useAuth } from '../Context';
import OrderCard from './OrderCard';
const Orders = () => {
    const [orders, setOrders] = useState([]); 
    const {isAuthenticated} = useAuth();
    const fetchActiveOrders = async() =>{
        try{
            const response = await axios.get('http://localhost:4000/api/customer/orders/active', {
                headers: {
                    Authorization: isAuthenticated
                }
            })

            console.log(response.data)
            setOrders(response.data)
        }catch(e){
            throw new Error(e)
        }
    }

    // Handle delete order
    const handleDeleteOrder = async(isAuthenticated, orderCode) => {
        try{
            const response = await axios.post('http://localhost:4000/api/customer/order/delete', {
                oc: orderCode
            },{
                headers: {
                    Authorization: isAuthenticated
                }
            })
            alert(response.data.message)
            fetchActiveOrders()
        }catch(e){
            throw new Error(e)
        }
    } 
    useEffect(()=>{
        fetchActiveOrders(); 
    },[])
    return (
        <div className='flex flex-col rounded-lg  shadow-xl justify-center items-center'>
        {orders.map((order, index)=>(
            <OrderCard key={index} restaurantCode={order.restaurantCode}
                        orderCode={order.orderCode}
                        orderCost={order.orderCost}
                        orderStatus={order.orderStatus}
                        handleDeleteOrder={handleDeleteOrder}/>
            
        ))}            

        </div>
    )
}

export default Orders