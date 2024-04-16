import { React, useEffect, useState } from "react";
import {
    Button,
    Dialog,
    Card,
    CardBody,
} from "@material-tailwind/react";
import { useAuth } from '../Context';
import axios from 'axios'

export function OrderDetailCard({ orderCode }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen((cur) => !cur);

    const { isAuthenticated } = useAuth()
    const [orderDetail, setOrderDetail] = useState({})
    console.log(orderCode)
    const fetchOrderDetails = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/customer/order/view', {
                params: {
                    oc: orderCode
                },
                headers: {
                    Authorization: isAuthenticated
                }
            })
            console.log(response.data)
            setOrderDetail(response.data)
        } catch (e) {
            throw new Error(e)
        }
    }

    useEffect(() => {
        fetchOrderDetails()
        console.log(orderDetail)
    }, [])
    return (
        <>
            <Button onClick={handleOpen}>Details</Button>
            <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-full max-w-[24rem]">
                    <CardBody className="flex flex-col gap-4 max-h-[800px] overflow-auto">
                        <p className="text-3xl">Order Details</p>
                        {Object.keys(orderDetail).length > 0 && (<>
                            <p>Customer: {orderDetail.orderInformation.recipientName}</p>
                            <p>Phone: {orderDetail.orderInformation.recipientPhone}</p>
                            <p>Location: {orderDetail.orderInformation.orderLocation}</p>
                            <p>Order date: {orderDetail.orderInformation.orderDate}</p>
                            <p>Total cost: {orderDetail.orderInformation.orderCost} $</p>
                        </>)}
                        <p className="text-3xl">List of Items </p>
                        {Object.keys(orderDetail).length > 0 &&
                            (orderDetail.orderItems.map((item, index) => (
                                <div key={index}>
                                    <img src={item.itemIMG} alt="Item Image" />
                                    <p>Name: {item.itemName}</p>
                                    <p>Price: {item.itemPrice}</p>
                                    <p>Quantity: {item.itemQuantity}</p>
                                    <p>UnitPrice: {item.totalUnitPrice}</p>
                                </div>
                            )))
                        }
                    </CardBody>
                </Card>
            </Dialog>
        </>
    );
}