
import React from 'react';

const YearRangeFilter = ({ selectedYearRange, setSelectedYearRange }) => {
  const handleMinYearChange = (e) => {
    setSelectedYearRange([parseInt(e.target.value), selectedYearRange[1]]);
  };

  const handleMaxYearChange = (e) => {
    setSelectedYearRange([selectedYearRange[0], parseInt(e.target.value)]);
  };

  return (
    <div>
      <h3>Filter by Year Range:</h3>
      <label>
        Min Year:
        <input type="number" value={selectedYearRange[0]} onChange={handleMinYearChange} />
      </label>
      <label>
        Max Year:
        <input type="number" value={selectedYearRange[1]} onChange={handleMaxYearChange} />
      </label>
    </div>
  );
};

export default YearRangeFilter;