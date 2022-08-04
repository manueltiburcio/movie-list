import React from 'react';
import exampleMovieData from '../data/exampleMovieData.js';
import MovieHeader from './MovieHeader.jsx';
import AddMovie from './AddMovie.jsx';
import MovieList from './MovieList.jsx';
import SearchBar from './SearchBar.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movieArray: [

      ],
      searchInput: '',
    };

    this.getData = this.getData.bind(this);
    this.addMovie = this.addMovie.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

  }

  getData(e) {

    this.setState({
      searchInput: e.target.value,
    })
  }

  addMovie(e) {
    e.preventDefault();

    this.setState({
      movieArray: [...this.state.movieArray,
        {
          title: this.capitalizeFirstLetter(this.state.searchInput),
          watch: false,
        }],
    })


  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


 handleSearch(e) {
  e.preventDefault();

  let wasFound = false;

  for (let i = 0; i < this.state.movieArray.length; i++) {
    if (this.state.movieArray[i].title.toLowerCase() === this.state.searchInput) {
      this.setState({
        movieArray: [{title: this.state.movieArray[i].title}]
      })

      wasFound = true;
    }
  }

  if (!wasFound) {
    // display message that was not found
    alert('movie was not found :(');
  }


 }



  render () {
    return (
      <React.Fragment>
        <nav className="navbar">
          <MovieHeader />
        </nav>
        <AddMovie getData={this.getData} addMovie={this.addMovie}/>
        <div className="container">
          <button className="watched">Watched</button>
          <button className="to-watch">To Watch</button>
          <SearchBar getData={this.getData} handleSearch={this.handleSearch}/>
        </div>

          <MovieList movies={this.state.movieArray} />

      </React.Fragment>
    )
  }
}


export default App;