import React from 'react'
// import image from '../assets/Images/FriedRice.png'
import { CiCircleMinus, CiCirclePlus, CiTrash } from "react-icons/ci";

const MenuItem = ({restaurantCode, name, price, image, handleAdd}) => {
    return (
        <div className='grid grid-col-3 mb-5 ml-[50px] mr-[50px] rounded-lg  shadow-xl justify-center items-center'>
            <div className=' grid grid-col-3 justify-center items-center'>
                <img className='w-[150px] h-[150px] col-start-1 col-span-1' src={image} alt="To be updated" />
                <div className='col-start-2 col-span-2'>
                    <p className='text-2xl font-semibold'>{name}</p>
                    <p >Fried rice with sausage, corn, pea,
                        (description)......</p>
                    <p>Price: {price} $</p>
                    
                </div>
            </div>

            <CiCirclePlus  onClick={() => handleAdd(restaurantCode,name, price)}
                        className=' h-10 w-10 col-start-3 ml-10 hover:cursor-pointer hover:scale-125' />

        </div>
    )
}

export default MenuItem