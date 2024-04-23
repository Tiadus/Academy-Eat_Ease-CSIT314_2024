import { React, useState } from "react";
import landingImg from "../assets/Images/landingPage.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { IoLocationSharp } from "react-icons/io5";
import { Button } from "@material-tailwind/react";
// import { Input, Button } from "@material-tailwind/react";

const LandingPage = () => {
  const [address, setAddress] = useState("");
  const onChange = ({ target }) => setAddress(target.value);
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/home?kw=${address}&lat=-34.408909&lon=150.8854373`);
  };

  const handleSearchAddress = async (address)=> {

    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q:address, 
          format: 'json',
          limit:1
        }
      });
      const displayAddress = response.data[0].display_name;
      const lat = response.data[0].lat;
      const lon = response.data[0].lon; 
      console.log(response.data)
      console.log(displayAddress, lat,lon);
  
      navigate(`/home?kw=&lat=${lat}&lon=${lon}`)
      return response.data;

    }catch (err) {
      throw err
    }

  }
  return (
    <div className="flex flex-col items-center">
      <img src={landingImg} className="w-full h-[650px]"></img>
      <div className=" grid grid-cols-10  w-1/2 h-[100px]  border-2 items-center">
        <input
          value={address}
          placeholder="    Enter your address"
          onChange={onChange}
          className=" col-span-7 ml-[40px] mr-[20px] border-2 rounded py-2"
        />
        <Button
        //   onClick={handleSearch}
          className="col-span-2 rounded  px-5 py-2 ml-[40px]"
          onClick={()=>{ handleSearchAddress(address)}}
        >
          Search
        </Button>
        <div className="flex mx-[40px]  col-span-7 text-gray-600 text-sm">
        <IoLocationSharp className="text-xl mr-2 " />
          <p>Or use </p>
          <p className="hover:underline px-1"> current location/</p>
          <p className="hover:underline"
             onClick={handleSearch}> UOW location</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
