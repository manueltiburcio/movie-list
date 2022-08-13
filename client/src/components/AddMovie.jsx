import React from 'react';


var AddMovie = ({ addMovie, getData }) => (
  <form className="add-bar input-group-prepend" action="">
    <input className="add-control" type="text" placeholder="Add movie title here..." onChange={getData}/>
      <button className="btn-add" onClick={addMovie}>Add</button>
  </form>
)
export default AddMovie;