import { React, useState } from 'react'
import landingImg from '../assets/Images/landingPage.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// import { Input, Button } from "@material-tailwind/react";

const LandingPage = () => {
    const [address, setAddress] = useState("");
    const onChange = ({ target }) => setAddress(target.value);
    const navigate = useNavigate(); 

    const handleSearch =  () => {

        navigate(`/home?kw=${address}&rlb=3&r=5&lat=-34.408909&lon=150.8854373`);

    }


    return (
        <div className='flex flex-col items-center'>
            <img src={landingImg} className='w-full h-[650px]'></img>
            <div className="relative flex  w-1/2 h-[100px] border-2 items-center">
                <input
                    value={address}
                    placeholder='Address'
                    onChange={onChange}
                    className="mx-[40px]  border-2 w-3/4 rounded py-2"

                />
                <button
                    onClick={handleSearch}
                    className=" rounded bg-blue-400 px-5 py-2 mr-[40px]"
                >
                    Search
                </button>

            </div>
        </div>

    );
}

export default LandingPage