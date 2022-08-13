import React from 'react';


var SearchBar = ({ handleSearch, getData, }) => (
  <form className="search-bar" action="">
    <input className="search-control" type="text" placeholder="Search..." onChange={getData}/>
    <button className="btn-search" onClick={handleSearch}>Go!</button>
  </form>
)
export default SearchBar;