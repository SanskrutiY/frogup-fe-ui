import { useState } from 'react';

// the search bar on top left
export default function SearchBar(){
    const[searchText, setSearchText] = useState();

    const handleInputChange = () => {
        console("Ranu handle input change !")
    }

    return(
        <div className='search-container'>
        {/* Search Bar */}
        <input
            type="text"
            placeholder="Search note..."
            value={searchText}
            onChange={handleInputChange}
            className='search-bar'
        />

        {/* Calendar (single date) */}
        <input
            type='date'
            className='date-filter'
        />

        {/* From date to now */}
        <input
            type='date'
            className='date-range-filter'
        />
        </div>
    );
}