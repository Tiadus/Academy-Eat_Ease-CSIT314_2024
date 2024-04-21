import React, { useState } from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
  } from "@material-tailwind/react";
   
export  const CategoryCard= ({catCode, name, image,active, selectCat})=> {
   
    // const [selected, setSelected] = useState(active===name)
    return (
      <Card color={active===name? 'light-blue': 'transparent'} shadow={true} 
            className="w-[235px] h-[70px] max-w-[26rem] border-2 m-5"
            onClick={()=>{
              console.log(active +" "+ name)
              if(active === name){
                selectCat('')
              }else {
                selectCat(name)
              }
              // setSelected(!selected),
              }}>
        <CardHeader
          color="transparent"
          floated={false}
          shadow={false}
          className="mx-0 flex items-center gap-4 pt-0 pb-8"
        >
          <Avatar
            size="lg"
            variant="circular"
            src={image}
            alt={catCode}
          />
          <div className="flex w-full flex-col gap-0.5">
            <div className="flex items-center justify-between">
              <Typography variant="h5" color="blue-gray" >
                {name}
              </Typography>
            </div>
          </div>
        </CardHeader>
        
      </Card>
    );
  }