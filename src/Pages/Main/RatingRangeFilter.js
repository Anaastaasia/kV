
import React from 'react';

const RatingRangeFilter = ({ selectedRatingRange, setSelectedRatingRange }) => {
  const handleMinRatingChange = (e) => {
    setSelectedRatingRange([parseInt(e.target.value), selectedRatingRange[1]]);
  };

  const handleMaxRatingChange = (e) => {
    setSelectedRatingRange([selectedRatingRange[0], parseInt(e.target.value)]);
  };

  return (
    <div>
      <h3>Filter by Rating Range:</h3>
      <label>
        Min Rating:
        <input type="number" value={selectedRatingRange[0]} onChange={handleMinRatingChange} />
      </label>
      <label>
        Max Rating:
        <input type="number" value={selectedRatingRange[1]} onChange={handleMaxRatingChange} />
      </label>
    </div>
  );
};

export default RatingRangeFilter;