import React, { useState } from 'react'
import { FaStar } from "react-icons/fa";

const Filter = ({ onFilter }) => {

    const [ratings, setRatings] = useState([]);
    const [distances, setDistances] = useState([]);

    const handleFilter = () => {
        // Call the parent component's filter function with the selected ratings and distances
        onFilter({ ratings, distances });
    };

    const handleRatingChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setRatings([...ratings, value]);
        } else {
            setRatings(ratings.filter((rating) => rating !== value));
        }
    };

    const handleDistanceChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setDistances([...distances, value]);
        } else {
            setDistances(distances.filter((distance) => distance !== value));
        }
    };

    return (
        <div className='flex flex-col gap-5 items-center'>
            <h2 className='text-2xl'>Filter by</h2>
            <div className='flex flex-col gap-3 items-center'>
                <h3 className='text-xl border-2 w-[150px] py-[5px] rounded-lg text-center'>Ratings</h3>
                <label className='w-[120px] border-2 flex gap-3 px-3 py-1 rounded-3xl items-center'>
                    <input type="checkbox" value="5" onChange={handleRatingChange} />
                    5  <FaStar className='text-yellow-300' />
                </label>
                <label className='w-[120px] border-2 flex gap-3 px-3 py-1 rounded-3xl items-center'>
                    <input type="checkbox" value="4" onChange={handleRatingChange} />
                    4  <FaStar className='text-yellow-300' />
                </label>
                <label className='w-[120px] border-2 flex gap-3 px-3 py-1 rounded-3xl items-center'>
                    <input type="checkbox" value="3" onChange={handleRatingChange} />
                    3  <FaStar className='text-yellow-300' />
                </label>
                <label className='w-[120px] border-2 flex gap-3 px-3 py-1 rounded-3xl items-center'>
                    <input type="checkbox" value="2" onChange={handleRatingChange} />
                    2  <FaStar className='text-yellow-300' />
                </label>
                <label className='w-[120px] border-2 flex gap-3 px-3 py-1 rounded-3xl items-center'>
                    <input type="checkbox" value="1" onChange={handleRatingChange} />
                    1  <FaStar className='text-yellow-300' />
                </label>
            </div>
            <div className='flex flex-col gap-3 items-center'>
                <h3 className='text-xl  border-2 w-[150px] py-[5px] rounded-lg text-center'>Distances:</h3>
                <label className='w-[120px] border-2 flex gap-3 px-3 py-1 rounded-3xl items-center'>
                    <input type="checkbox" value="10" onChange={handleDistanceChange} />
                    10 km
                </label>
                <label className='w-[120px] border-2 flex gap-3 px-3 py-1 rounded-3xl items-center'>
                    <input type="checkbox" value="5" onChange={handleDistanceChange} />
                    5 km
                </label>
                <label className='w-[120px] border-2 flex gap-3 px-3 py-1 rounded-3xl items-center'>
                    <input type="checkbox" value="2" onChange={handleDistanceChange} />
                    2 km
                </label>
            </div>
        </div>
    )
}

export default Filter