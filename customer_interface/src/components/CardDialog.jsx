import React, { useEffect } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    IconButton,
    Typography,
    MenuItem,
} from "@material-tailwind/react";
import NewCardInfo from '../components/NewCardInfo'
import { FaCcMastercard } from "react-icons/fa";
import masterCard from '../assets/Images/mastercard.jpeg'
import { useAuth } from "../Context";
import { FaRegTrashAlt } from "react-icons/fa";
import axios from 'axios'
export function CartDialog({totalCost}) {
    const [open, setOpen] = React.useState(false);
    const { isAuthenticated, user, paymentCards, setPaymentCards } = useAuth();
    const handleOpen = () => setOpen((cur) => !cur);
    const navigate = useNavigate()
    const fetchCards = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/customer/payment/view', {
                headers: {
                    Authorization: isAuthenticated
                }
            })
            setPaymentCards(response.data)
            console.log(user)
        } catch (e) {
            throw new Error(e)
        }
    }

    //Handle create new Order
    const handleCreateOrder = async (name, phone, location, totalCost) => {
        try{
            const response = await axios.post('http://localhost:4000/api/customer/order/create',{
                recipientName :name,
                recipientPhone : phone, 
                orderLocation :location, 
                orderCost: totalCost
            },{
                headers: {
                    Authorization: isAuthenticated
                }
            })

            //orderCode 
            console.log(response)
            alert("Order created successfully")
            return response.data;
        }catch(e){
            throw new Error(e)
        }
    }

    // const handleDeleteCard = async (paymenCode)=>{
    //     try{
    //         const response = await axios.post('http://localhost:4000/api/customer/payment/delete', {
    //             pc: paymenCode
    //         }, {
    //             headers: {
    //                 Authorization: isAuthenticated
    //             }
    //         })
    //     }catch(e){
    //         throw new Error(e)
    //     }
    // }

    useEffect(() => {
        fetchCards();
    }, [])
    return (
        <>
            <Button onClick={handleOpen}>Check out</Button>
            <Dialog size="xs" open={open} handler={handleOpen}>
                <DialogHeader className="justify-between">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Payment method
                        </Typography>
                        <Typography color="gray" variant="paragraph">
                            Choose your card
                        </Typography>
                    </div>
                    <IconButton
                        color="blue-gray"
                        size="sm"
                        variant="text"
                        onClick={handleOpen}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </IconButton>
                </DialogHeader>
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
                            {paymentCards.map((card, index) => (
                                <MenuItem key={index} 
                                        className="mb-4 flex items-center justify-center gap-3 !py-4 shadow-md"
                                        onClick={()=>handleCreateOrder(user.customerName,'012345678', 'UOW',totalCost)}>
                                    <img
                                        src={masterCard}
                                        alt="metamast"
                                        className="h-10 w-10"
                                    />
                                    <Typography
                                        className="uppercase"
                                        color="blue-gray"
                                        variant="h6"
                                    >
                                        {card.cardNumber}
                                    </Typography>
                                    {/* <FaRegTrashAlt onClick={()=>handleDeleteCard(card.paymentCode)}/> */}
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
                            <NewCardInfo />
                        </ul>
                    </div>
                </DialogBody>

            </Dialog>
        </>
    );
}