import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Radio, Button } from "@material-tailwind/react";

const Filter = ({selectedCat, handleFilterCategory, handleSearch }) => {
  const [ratings, setRatings] = useState(1);
  const [distances, setDistances] = useState(10);
  const [clear, setClear] = useState(false);
 
  const handleFilter = () => {
    // Call the parent component's filter function with the selected ratings and distances
    // onFilter({ ratings, distances });
    selectedCat? handleFilterCategory(selectedCat,ratings,distances):
    handleSearch(ratings, distances);
  };

  const handleClearFilter = () => {
    setRatings(null); // Clear ratings selection
    setDistances(null); 
    handleSearch(0, 100);
  }
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

  useEffect(()=>{
    handleClearFilter()
  },[clear])
  return (
    <div className="flex flex-col gap-5 items-center">
      <h2 className="text-2xl">Filter by</h2>
      <div className="flex flex-col gap-3 items-center">
        <h3 className="text-xl border-2 w-[150px] py-[5px] rounded-lg text-center">
          Ratings
        </h3>
        <div className="flex flex-col ">
        {[5, 4, 3, 2, 1].map((rating) => (
            <label
              key={rating}
              className="w-[120px] border-2 flex gap-3 px-3 m-2 rounded-3xl items-center"
            >
              <Radio
                key={rating}
                name="rating"
                value={rating}
                label={rating}
                // checked={!clear}
                onClick={(e) => setRatings(e.target.value)}
              />
              <FaStar className="text-yellow-300" />
            </label>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3 items-center">
        <h3 className="text-xl  border-2 w-[150px] py-[5px] rounded-lg text-center">
          Distances:
        </h3>
        <div className="flex flex-col ">
        {[25, 20, 15, 10, 5].map((distance) => (
            <label
              key={distance}
              className="w-[120px] border-2 flex gap-3 px-3 m-2 rounded-3xl items-center"
            >
              <Radio
                name="distance"
                value={distance}
                label={`${distance} km`}
                // checked={distances === distance}
                onClick={(e) => setDistances(e.target.value)}
              />
            </label>
          ))}
        </div>
      </div>
      <Button onClick={handleFilter}>Apply Filter</Button>
      <Button onClick={handleClearFilter}>Clear Filter</Button>

    </div>
  );
};

export default Filter;
