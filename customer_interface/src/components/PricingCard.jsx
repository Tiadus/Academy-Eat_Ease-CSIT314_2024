import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import { useAuth } from "../Context";
import axios from 'axios'
import { useState } from "react";
function CheckIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-3 w-3"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
            />
        </svg>
    );
}

export function PricingCard({ price, type, memberType, membershipEnd , setEndDate, setMembershipType}) {
    let bg_color;
    switch (type) {
        case 0:
            bg_color = "gray";
            break;

        case 1:
            bg_color = "yellow"
            break;
        case null:
            break; 
        
        
        
    }

    const {user,setUser, isAuthenticated} = useAuth(); 
    //Handle subcribe 
    const handleSubscribe = async (type)=>{
        try{
            console.log(type);
            const response = await axios.post('http://localhost:4000/api/customer/membership/subscribe',{
                sct:type
            }, {
                headers: {
                    Authorization: isAuthenticated
                }
            })
            console.log(response)
            // const newUser = user; 
            // newUser.membershipEndDate = response.data.membershipEnd; 
            // setUser(newUser);
            setEndDate(response.data.membershipEnd)
            // alert("Subcribe sucessfully")
        }catch(e){
            alert('Cancel current subscription first')
            throw new Error(e)
        }
    }

    //Handle Renew

    const handleRenew = async ()=>{
        try{
            const response = await axios.post('http://localhost:4000/api/customer/membership/renew', {

            },{
                headers: {
                    Authorization: isAuthenticated
                }
            })
            console.log(response)
            setEndDate(response.data)
            // alert("Renew sucessfully")
        }catch(e){
            throw new Error(e)
        }
    }
    //Handle Cancel
    const handleCancel = async ()=>{
        try{
            const response = await axios.post('http://localhost:4000/api/customer/membership/cancel', {

            },{
                headers: {
                    Authorization: isAuthenticated
                }
            })
            console.log(response)
            // alert("Cancel sucessfully")
        }catch(e){
            throw new Error(e)
        }
    }

    return (
        <Card color={bg_color} variant="gradient" className="w-full max-w-[20rem] p-8">
            <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
            >
                
                <Typography
                    variant="h1"
                    color="white"
                    className="mt-6 flex justify-center gap-1 text-7xl font-normal"
                >
                    <span className="mt-2 text-4xl">$</span>{price}
                    {type===0? 
                    <span className="self-end text-4xl">/month</span>
                    :
                    <span className="self-end text-4xl">/year</span>
                    }
                </Typography>
            </CardHeader>
            <CardBody className="p-0">
                <ul className="flex flex-col gap-4">
                    <li className="flex items-center gap-4">
                        <span className="rounded-full border border-white/20 bg-white/20 p-1">
                            <CheckIcon />
                        </span>
                        <Typography className="font-normal">Personalized offers </Typography>
                    </li>
                    <li className="flex items-center gap-4">
                        <span className="rounded-full border border-white/20 bg-white/20 p-1">
                            <CheckIcon />
                        </span>
                        <Typography className="font-normal">Delivery discount</Typography>
                    </li>
                    <li className="flex items-center gap-4">
                        <span className="rounded-full border border-white/20 bg-white/20 p-1">
                            <CheckIcon />
                        </span>
                        <Typography className="font-normal">15 days free trials</Typography>
                    </li>
                    <li className="flex items-center gap-4">
                        <span className="rounded-full border border-white/20 bg-white/20 p-1">
                            <CheckIcon />
                        </span>
                        <Typography className="font-normal">Hottest Deals</Typography>
                    </li>
                    <li className="flex items-center gap-4">
                        <span className="rounded-full border border-white/20 bg-white/20 p-1">
                            <CheckIcon />
                        </span>
                        {type === memberType?
                        <Typography className="font-normal">
                            End Date: {membershipEnd}
                        </Typography>:
                        <Typography className="font-normal">
                            NO End Date yet
                        </Typography> }
                        
                    </li>
                </ul>
            </CardBody>
            <CardFooter className="mt-12 p-0 flex gap-5">
                {type===memberType?<>

                <Button
                    size="lg"
                    color="white"
                    className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
                    ripple={false}
                    fullWidth={true}
                    onClick = {()=>handleRenew()}
                >
                    Renew 
                </Button>
                <Button
                    size="lg"
                    color="white"
                    className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
                    ripple={false}
                    fullWidth={true}
                    onClick={()=>handleCancel()}
                >
                    Cancel
                </Button>
                </>
                    :
                    
                    <Button
                    size="lg"
                    color="white"
                    className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
                    ripple={false}
                    fullWidth={true}
                    onClick={()=>handleSubscribe(type)}
                >
                    Subscribe Now 
                </Button>}
            </CardFooter>
        </Card>
    );
}