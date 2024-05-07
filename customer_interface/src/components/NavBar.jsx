import { React, useEffect, useState } from "react";
import eatEaseLogo from "../assets/Images/EatEase.png";
import { FaCartShopping } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";
import { Badge } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context";
import { useNavigate } from "react-router-dom";
const NavBar = () => {
  const { totalItems, searchCount, setSearchCount } = useAuth();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const onChange = ({ target }) => setKeyword(target.value);
  console.log("TotalItems: ", totalItems);

  //Function used to set the new keyword count which invoke home page reload
  const handleKWSearch = () => {
    setSearchCount(prevCount => prevCount+1);
    navigate(`/home?kw=${keyword}&rlb=3&r=5&lat=-34.408909&lon=150.8854373`);
  }
  
  return (
    <div className="grid grid-cols-10 bg-eatEase w-full">
      <div
        className="flex gap-5 items-center col-span-2 ml-10"
        onClick={() => navigate("/page")}
      >
        <img
          className="w-[50px] h-[50px] rounded-3xl my-2 "
          src={eatEaseLogo}
          alt="Eat Ease Logo"
        />
        <p className="text-4xl  text-gray-50 ">Eat ease</p>
      </div>
      <div
        className=" flex gap-5 col-start-3 col-span-5 my-5 mx-10  items-center bg-white
                            h-3/5  pl-5 pr-5 rounded-lg"
      >
        <input
          className="w-full text-3xl"
          type="text"
          placeholder="Find a restaurant"
          value={keyword}
          onChange={onChange}
        />
        <FaSearch onClick={handleKWSearch}
          className="text-4xl"
        />
      </div>
      <div className="flex  col-start-9 col-span-2 items-center">
        <Badge
          content={totalItems ? totalItems : 0}
          className=""
          onClick={() => navigate("/cart")}
        >
          <FaCartShopping className="text-4xl  text-gray-50"
          onClick={() => navigate("/cart")} />
        </Badge>

        <CgProfile
          className="text-4xl text-gray-50 ml-8"
          onClick={() => navigate("/profile")}
        />
      </div>
    </div>
  );
};

export default NavBar;
