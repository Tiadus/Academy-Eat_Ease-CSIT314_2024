import React, { useState } from 'react'
import banner from '../assets/Images/GYG.jpeg'
import { PricingCard } from './PricingCard'
import { useAuth } from '../Context'

const Membership = () => {
    const {user, isAuthenticated} = useAuth()
    console.log(user)
    const [endDate, setEndDate] = useState(user.membershipEnd)
    const [membershipType, setMembershipType] = useState(user.membershipType)
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