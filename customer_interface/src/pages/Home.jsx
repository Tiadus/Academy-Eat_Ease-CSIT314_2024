import { React, useEffect, useState } from 'react'
import { LuMapPin } from "react-icons/lu";
import Filter from '../components/Filter';
import RestaurantCard from '../components/RestaurantCard';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios'; // Import axios
import { CategoryCard } from '../components/CategoryCard';
import NavBar from '../components/NavBar';

const Home = () => {

  const [restaurants, setRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState('');
  const location = useLocation(); // Initialize useLocation hook
  const searchParams = new URLSearchParams(location.search); // Get search parameters from URL

  // Extract parameters from URL
  const kw = searchParams.get('kw');
  const rlb = searchParams.get('rlb');
  const r = searchParams.get('r');
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/restaurants', {
        params: {
          kw: kw,
          // rlb: rlb,
          r: r,
          lat: lat,
          lon: lon
        }
      });
      setRestaurants(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  }

  // fetch categories
  const fetchCategory = async () => {
    try {
      const respone = await axios.get('http://localhost:4000/api/categories')
      setCategories(respone.data);
      console.log(respone.data);
    } catch (e) {
      throw new Error(e)
    }
  }

  // Handle filter category
  const handleFilterCategory = async (selectedCat, rlb, r, lat, lon) => {
    try {
      const response = await axios.get('http://localhost:4000/api/restaurants/' + selectedCat, {
        params: {
          rlb: rlb,
          r: r,
          lat: lat,
          lon: lon
        }
      })

      console.log(response.data)
      // response.data? setRestaurants(response.data):  alert("NO restataurants MATCHED")
      response.data.length > 0 ? setRestaurants(response.data)
        : alert("No restataurants MATCHED")


     
    } catch (e) {
      throw new Error(e)
    }
  }

  useEffect(() => {
    fetchCategory()
    handleSearch()
  }, [])

  useEffect(() => {
    console.log(selectedCat)
    selectedCat===''?{} : handleFilterCategory(selectedCat, rlb, r, lat, lon);
     

  }, [selectedCat])
  return (
    <div className='flex flex-col items-center w-full'>
      <NavBar />
      {/* SLIDER or Banner here */}
      <div className='text-3xl my-5'>Category</div>
      <div className='grid grid-cols-5 '>
        {categories.map((category, index) => (
          <CategoryCard key={index}
            catCode={category.categoryCode}
            name={category.categoryName}
            image={category.categoryIMG}
            active={selectedCat}
            selectCat={setSelectedCat}
             />

        ))}
      </div>

      {/* Current address */}
      <div className='flex bg-gray-400 w-[500px] h-[100px] rounded-lg  items-center justify-center mb-10' >
        University of Wollongong, NSW, 2522, Australia.   <LuMapPin className='h-[25px] w-[25px]' />

      </div>

      <div className='grid grid-cols-10 w-3/4 w-full'>
        {/* Filter */}
        <div className='col-span-3 ml-[160px]'>
          <Filter />
        </div>
        {/* Restaurant list */}
        <div className='flex flex-col col-span-5 gap-5'>
          {restaurants.map((restaurant, index) => (
            <RestaurantCard
              key={index}
              code={restaurant.restaurantCode}
              name={restaurant.restaurantName}
              rating={restaurant.rating}
              restaurantCode={restaurant.restaurantCode}
              location={restaurant.restaurantLocation}
            />

          ))}
        </div>
      </div>
    </div>
  )
}

export default Home