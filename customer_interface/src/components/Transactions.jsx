import React, { useEffect, useState } from 'react'
import image from '../assets/Images/FriedRice.png'
import axios from 'axios'
import { useAuth } from '../Context';
import TransactionCard from './TransactionCard';
const Transactions = () => {
    const [orders, setOrders] = useState([]); 
    const {isAuthenticated} = useAuth();
    const fetchPastOrders = async() =>{
        try{
            const response = await axios.get('http://localhost:4000/api/customer/orders/history', {
                headers: {
                    Authorization: isAuthenticated
                }
            })

            console.log("Past order: ", response.data)
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
            fetchPastOrders()
        }catch(e){
            throw new Error(e)
        }
    } 
    useEffect(()=>{
        fetchPastOrders(); 
    },[])
    return (
        <div className='flex flex-col rounded-lg align-middle items-center w-3/4'>
        <div className='text-4xl m-10 border-black border-b w-1/2 text-center'>Past Transactions </div>
        <div className='grid grid-cols-10 g-5 w-full m-5'>
            <p className=' grid col-span-4 text-2xl text-center'>Transaction ID </p>
            <p className=' grid col-span-2 text-2xl text-center'>Status</p>
            <p className=' grid col-span-2 text-2xl text-center'>Cash flows</p>
            <p className=' grid col-span-2 text-2xl text-center'>Actions</p>
        </div>
        {orders.map((order, index)=>(
            <TransactionCard key={index} restaurantCode={order.restaurantCode}
                        orderCode={order.orderCode}
                        orderCost={order.orderCost}
                        orderStatus={order.orderStatus}
                        rejectReason={order.rejectReason}
                        handleDeleteOrder={handleDeleteOrder}/>
            
        ))}            

        </div>
    )
}

export default Transactions