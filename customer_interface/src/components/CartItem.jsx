import {React, useEffect, useState} from 'react'
import { CiCircleMinus, CiCirclePlus, CiTrash } from "react-icons/ci";

const Item = ({name, price, quantity, image, restaurantCode, handleAdd, handleDelete, handleUpdate}) => {
  return (
    <div className='grid grid-col-3 mb-5 ml-[50px] mr-[50px] rounded-lg  shadow-xl'>
      <div className=' grid grid-col-3 justify-center items-center'>
        <img className='w-[150px] h-[150px] col-start-1 col-span-1' src={image} alt="" />
        <div className='col-start-2 col-span-2'>
          <p className='text-2xl font-semibold'>{name}</p>
          
        </div>
      </div>

      <div className='col-start-3 col-span-1 grid grid-cols-5 text-2xl items-center '>
        <CiCircleMinus className='w-full' 
                       onClick = {()=>{
                                  handleUpdate(name, quantity -1)}} />
        < input className='border-2 rounded-lg text-center' 
                value={quantity} 
                onChange={(e) =>
                { 
                  if (e.target.value !== '') {
                    handleUpdate(name, e.target.value);
                  } 
                } }/>
        <CiCirclePlus className='w-full' 
                      onClick={()=> {
                        handleAdd(restaurantCode, name, price)
                      }
                    }/>
        <div className='w-full text-center'>{price}$</div>
        <CiTrash className='w-full' onClick={()=>handleUpdate(name,0)} />

      </div>
    </div>
  )
}

export default Item