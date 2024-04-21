import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Radio, Button } from "@material-tailwind/react";

const Filter = ({ handleSearch }) => {
  const [ratings, setRatings] = useState(1);
  const [distances, setDistances] = useState(10);

  const handleFilter = () => {
    // Call the parent component's filter function with the selected ratings and distances
    // onFilter({ ratings, distances });
    handleSearch(ratings, distances);
  };

  //   const handleRatingChange = (e) => {
  //     setRatings(e.target.value);
  //     handleSearch(ratings, distances)
  //   };
  console.log("rating changed " + ratings);
  console.log(`Distance` + distances);

  //   const handleDistanceChange = (e) => {
  //     const { value, checked } = e.target;
  //     if (checked) {
  //       setDistances([...distances, value]);
  //     } else {
  //       setDistances(distances.filter((distance) => distance !== value));
  //     }
  //   };

  return (
    <div className="flex flex-col gap-5 items-center">
      <h2 className="text-2xl">Filter by</h2>
      <div className="flex flex-col gap-3 items-center">
        <h3 className="text-xl border-2 w-[150px] py-[5px] rounded-lg text-center">
          Ratings
        </h3>
        <div className="flex flex-col ">
          <label className="w-[120px] border-2 flex gap-3 px-3 m-2 rounded-3xl items-center">
            <Radio
              name="rating"
              value="5"
              label="5"
              onClick={(e) => setRatings(e.target.value)}
            />
            <FaStar className="text-yellow-300" />
          </label>
          <label className="w-[120px] border-2 flex gap-3 px-3 m-2 rounded-3xl items-center">
            <Radio
              name="rating"
              value="4"
              label="4"
              onClick={(e) => setRatings(e.target.value)}
            />
            <FaStar className="text-yellow-300" />
          </label>
          <label className="w-[120px] border-2 flex gap-3 px-3 m-2 rounded-3xl items-center">
            <Radio
              name="rating"
              value="3"
              label="3"
              onClick={(e) => setRatings(e.target.value)}
            />
            <FaStar className="text-yellow-300" />
          </label>
          <label className="w-[120px] border-2 flex gap-3 px-3 m-2 rounded-3xl items-center">
            <Radio
              name="rating"
              value="2"
              label="2"
              onClick={(e) => setRatings(e.target.value)}
            />
            <FaStar className="text-yellow-300" />
          </label>
          <label className="w-[120px] border-2 flex gap-3 px-3 m-2 rounded-3xl items-center">
            <Radio
              name="rating"
              value="1"
              label="1"
              onClick={(e) => setRatings(e.target.value)}
            />
            <FaStar className="text-yellow-300" />
          </label>
        </div>
      </div>
      <div className="flex flex-col gap-3 items-center">
        <h3 className="text-xl  border-2 w-[150px] py-[5px] rounded-lg text-center">
          Distances:
        </h3>
        <div className="flex flex-col ">
          <label className="w-[120px] border-2 flex gap-3 px-3 m-2 rounded-3xl items-center">
            <Radio
              name="distance"
              value="25"
              label="25 km"
              onClick={(e) => setDistances(e.target.value)}
            />
          </label>
          <label className="w-[120px] border-2 flex gap-3 px-3 m-2 rounded-3xl items-center">
            <Radio
              name="distance"
              value="20"
              label="20 km"
              onClick={(e) => setDistances(e.target.value)}
            />
          </label>
          <label className="w-[120px] border-2 flex gap-3 px-3 m-2 rounded-3xl items-center">
            <Radio
              name="distance"
              value="15"
              label="15 km"
              onClick={(e) => setDistances(e.target.value)}
            />
          </label>
          <label className="w-[120px] border-2 flex gap-3 px-3 m-2 rounded-3xl items-center">
            <Radio
              name="distance"
              value="10"
              label="10 km"
              onClick={(e) => setDistances(e.target.value)}
            />
          </label>
          <label className="w-[120px] border-2 flex gap-3 px-3 m-2 rounded-3xl items-center">
            <Radio
              name="distance"
              value="5"
              label="5 km"
              onClick={(e) => setDistances(e.target.value)}
            />
          </label>
        </div>
      </div>
      <Button onClick={handleFilter}>Apply Filter</Button>
    </div>
  );
};

export default Filter;
