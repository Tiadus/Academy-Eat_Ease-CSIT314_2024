import React, { useEffect, useState } from 'react'
// import image from '../assets/Images/FriedRice.png'
import { CiCircleMinus, CiCirclePlus, CiTrash } from "react-icons/ci";
import { BiDetail } from "react-icons/bi";
import { useAuth } from '../Context';

import { OrderDetailCard } from './OrderDetailCard';
const TransactionCard = ({ restaurantCode,
    orderCode,
    orderCost,
    orderStatus,
    handleDeleteOrder }) => {

    const { isAuthenticated } = useAuth()

    return (
        <div className='grid grid-cols-10 g-5 w-full border-black border-t p-10 mb-5 items-center'>
            <div className='col-span-4 text-center '>{orderCode}</div>
            <div className='col-span-2 text-center '>{orderStatus === 1 ? 'Active' : 'Not active'}</div>
            <div className='col-span-2 text-center'>- {orderCost} $ </div>
            <div className='col-span-2 text-center ml-[60px]'>
                <OrderDetailCard  orderCode={orderCode} />
            </div>
            {/* <CiTrash onClick={() => handleDeleteOrder(isAuthenticated, orderCode)} /> */}
        </div>
    )
}

export default TransactionCard