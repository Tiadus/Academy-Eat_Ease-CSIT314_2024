import React, { useEffect } from 'react'
import {
    DialogBody,
    Typography,
    MenuItem,
} from "@material-tailwind/react";

import { FaCcMastercard } from 'react-icons/fa';
import NewCardInfo from './NewCardInfo';
import { useAuth } from '../Context';
import { FaRegTrashAlt } from "react-icons/fa";

import axios from 'axios';

const Payment = () => {
    const {isAuthenticated, paymentCards, setPaymentCards} = useAuth()

    const fetchCards = async ()=> {
        try {
            const response = await axios.get('http://localhost:4000/api/customer/payment/view',  {
                headers: {
                    Authorization: isAuthenticated
                }
            })
            setPaymentCards(response.data)
            console.log(paymentCards)
        }catch(e) {
            throw new Error(e)
        }
    }

    const handleDeleteCard = async (paymenCode)=>{
        try{
            const response = await axios.post('http://localhost:4000/api/customer/payment/delete', {
                pc: paymenCode
            }, {
                headers: {
                    Authorization: isAuthenticated
                }
            })
        }catch(e){
            throw new Error(e)
        }
    }
    useEffect(()=>{
        console.log(paymentCards)
        fetchCards()
    },[])

    return (

        <DialogBody className="overflow-y-scroll !px-5">
            <div className="mb-6">
                <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="py-3 font-semibold uppercase opacity-70"
                >
                    Existing cards
                </Typography>
                <ul className="mt-3 -ml-2 flex flex-col gap-1">
                    {paymentCards.map((card, index)=>(
                        <MenuItem key={index} className="mb-4 flex items-center justify-center gap-3 !py-4 shadow-md">
                        <FaCcMastercard />
                        <Typography
                            className="uppercase"
                            color="blue-gray"
                            variant="h6"
                        >
                            {card.cardNumber}
                        </Typography>
                        <FaRegTrashAlt onClick={()=> handleDeleteCard(card.paymentCode)}/>
                    </MenuItem>
                    ))}  
                </ul>
            </div>
            <div>
                <Typography
                    variant="paragraph"
                    color="blue-gray"
                    className="py-4 font-semibold uppercase opacity-70"
                >
                    Add a new card
                </Typography>
                <ul className="mt-4 -ml-2.5 flex flex-col gap-1">
                    <NewCardInfo/>
                </ul>
            </div>
        </DialogBody>


    )
}

export default Payment