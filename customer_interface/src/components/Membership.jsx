import React, { useEffect, useState } from 'react'
import banner from '../assets/Images/GYG.jpeg'
import { PricingCard } from './PricingCard'
import { useAuth } from '../Context'
import axios from 'axios'
const Membership = () => {
    const {user, isAuthenticated, setUser} = useAuth()
    console.log(user)
    const [endDate, setEndDate] = useState(user.membershipEnd)
    const [membershipType, setMembershipType] = useState(user.membershipType)

    const getCustomerInfo = async () => {
        try {
          const response = await axios.get('http://localhost:4000/api/customer/information', {
            headers: {
              Authorization: isAuthenticated
            }
          })

          console.log("customer information: ", response.data)
          setUser(response.data)
        } catch (e) {
          throw new Error(e)
        }
      }
    
      useEffect(()=>{
        getCustomerInfo()
      }
      ,[endDate|| membershipType])
    
    return (
        <div className=''>
            {/* Banner */}
            <img className='h-[200px] w-full' src={banner} alt="" />
            <div className='flex gap-20 m-20  items-center justify-center'>
                <PricingCard price ='29' type = {0} 
                memberType= {membershipType} 
                membershipEnd = {endDate}/>
                <PricingCard price = '149' type = {1}
                memberType= {membershipType}
                membershipEnd ={endDate}
                setEndDate= {setEndDate}
                setMembershipType={setMembershipType}/>

            </div>

        </div>
    )
}

export default Membership