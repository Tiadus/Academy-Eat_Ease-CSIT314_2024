import { React, useEffect, useState } from "react";
import { Button, Dialog, Card, CardBody } from "@material-tailwind/react";
import { useAuth } from "../Context";
import axios from "axios";
import ReviewOrder from "./ReviewOrder";

export function OrderDetailCard({ orderCode, orderStatus, rejectReason }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const { isAuthenticated } = useAuth();
  const [orderDetail, setOrderDetail] = useState({});
  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/customer/order/view",
        {
          params: {
            oc: orderCode,
          },
          headers: {
            Authorization: isAuthenticated,
          },
        }
      );
      // console.log(response.data)
      setOrderDetail(response.data);
    } catch (e) {
      throw new Error(e);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
    // console.log(orderDetail)
  }, []);
  return (
    <div>
      <Button onClick={handleOpen}>Details</Button>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-[400px] ">
          <CardBody className="flex flex-col gap-4 max-h-[800px] w-[400px] overflow-auto ">
            <p className="text-3xl font-bold text-center">Order Details</p>
            <hr />
            {Object.keys(orderDetail).length > 0 && (
              <>
                <p className="text-sm text-center">
                  Order date: {orderDetail.orderInformation.orderDate}
                </p>
                <p className="text-sm font-semibold text-center">
                  Location: {orderDetail.orderInformation.orderLocation}
                </p>
              </>
            )}
            {rejectReason && (
              <>
                <hr />
                <p className="text-2xl font-semibold ">Reject reason</p>
                {Object.keys(orderDetail).length > 0 && (
                  <>
                    <p className="">Reason: {rejectReason}</p>
                  </>
                )}
              </>
            )}
            <hr />
            <p className="text-2xl font-semibold ">Customer information</p>
            {Object.keys(orderDetail).length > 0 && (
              <>
                <p className="">
                  Customer: {orderDetail.orderInformation.recipientName}
                </p>
                <p className="">
                  Phone: {orderDetail.orderInformation.recipientPhone}
                </p>
              </>
            )}
            <hr />
            <p className="text-2xl font-semibold ">List of Items </p>
            <div className="grid grid-cols-6 font-medium text-lg">
              {/* <img src={item.itemIMG} alt="Item Image" /> */}
              <p className="col-span-3 ">Name</p>
              <p className="col-span-1 text-center">Quantity</p>
              {/* <p className="col-span-1 text-center">Unit price</p> */}
              <p className="col-span-2 text-center"> Price</p>
            </div>
            <hr />
            {Object.keys(orderDetail).length > 0 &&
              orderDetail.orderItems.map((item, index) => (
                <div key={index} className="grid grid-cols-6">
                  {/* <img src={item.itemIMG} alt="Item Image" /> */}
                  <p className="col-span-3 ">{item.itemName}</p>
                  <p className="col-span-1 text-center">{item.itemQuantity}</p>
                  {/* <p className="col-span-1 text-center">${item.itemPrice}</p> */}
                  <p className="col-span-2 text-center">
                    ${item.totalUnitPrice}
                  </p>
                </div>
              ))}
            <hr />
            {Object.keys(orderDetail).length > 0 && (
              <div className=" grid grid-cols-6">
                <p className="font-bold col-span-3 ">Total cost:</p>
                <p className="font-bold col-start-5 col-span-2 text-center">
                  ${orderDetail.orderInformation.orderCost}
                </p>
              </div>
            )}
            {orderStatus === 2 ? (
              <ReviewOrder orderCode={orderCode} handleClose={handleOpen} />
            ) : (
              <></>
            )}
          </CardBody>
        </Card>
      </Dialog>
    </div>
  );
}
