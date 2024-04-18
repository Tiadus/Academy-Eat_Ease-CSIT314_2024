import React, { useEffect, useState } from 'react'
// import image from '../assets/Images/FriedRice.png'
import { CiCircleMinus, CiCirclePlus, CiTrash } from "react-icons/ci";
import { BiDetail } from "react-icons/bi";
import { useAuth } from '../Context';

import { OrderDetailCard } from './OrderDetailCard';
const OrderCard = ({ restaurantCode,
    orderCode,
    orderCost,
    orderStatus,
    handleDeleteOrder }) => {

    const { isAuthenticated } = useAuth()

    return (
        <div className='grid grid-col-3 mb-5 my-[50px] px-8 rounded-lg border border-black justify-center items-center'>
            <div className=' grid grid-col-3 justify-center items-center m-[20px] '>
                <div className='col-start-2 col-span-2'>
                    <p>Restaurant Code: {restaurantCode}</p>
                    <p className='text-2xl font-semibold'>Order Code: {orderCode}</p>
                    <p >Status: {orderStatus === 1 ? 'Pending' : 'In Delivery'}</p>
                    <p>Total: {orderCost} $</p>

                <OrderDetailCard orderCode={orderCode} orderStatus={orderStatus}/>
                </div>
                {/* <CiTrash onClick={() => handleDeleteOrder(isAuthenticated, orderCode)} /> */}
            </div>

        </div>
    )
}

export default OrderCard