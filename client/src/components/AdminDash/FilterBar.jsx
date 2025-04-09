// FilterBar.js
import React, { useState, useCallback } from 'react';
import { debounce } from 'lodash';

const FilterBar = ({ searchPlaceholder, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearch = useCallback(
    debounce((term) => {
      onSearch(term);
    }, 1000), 
    [onSearch]
  );

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedSearch(term); 
  };

  return (
    <div className="flex space-x-2">
      <input
        type="text"
        placeholder={searchPlaceholder}
        value={searchTerm}
        onChange={handleSearchChange}
        className="p-2 border rounded w-64"
      />
    </div>
  );
};

export default FilterBar;