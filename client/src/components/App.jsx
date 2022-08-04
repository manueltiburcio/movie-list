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
      movieArray: [],
      searchInput: '',
      watchedMovies: [],
      toWatchMovies: [],
    };

    this.watchedArray = [];
    this.toWatchArray = [];

    this.getData = this.getData.bind(this);
    this.addMovie = this.addMovie.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.activeWatch = this.activeWatch.bind(this);
    this.activeToWatch = this.activeToWatch.bind(this);

  }

  activeWatch(e) {
    e.preventDefault();

    for (let i = 0; i < this.state.movieArray.length; i++) {
      if (this.state.movieArray[i].watch === true) {
        this.watchedArray.push({title: this.state.movieArray[i].title, watch: true,})
      }
     }

     this.setState({
      movieArray: [...this.watchedArray]
    })

  }

  activeToWatch(e) {

    for (let i = 0; i < this.state.movieArray.length; i++) {
      if (this.state.movieArray[i].watch === false) {
        this.toWatchArray.push({title: this.state.movieArray[i].title, watch: false,})
      }
     }

     this.setState({
      movieArray: [...this.toWatchArray]
    })

  }

  getData(e) {
    this.setState({
      searchInput: e.target.value,
    })
  }

  addMovie(e) {
    e.preventDefault();
    if (this.state.searchInput === '') {
      alert('Insert movie title to add a movie');
      return;
    }

    this.setState({
      movieArray: [...this.state.movieArray,
        {
          title: this.capitalizeFirstLetter(this.state.searchInput),
          watch: Math.random() < 0.5,
        }],
    })


  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


 handleSearch(e) {
  e.preventDefault();
  if (this.state.searchInput === '') {
    alert('Insert movie title to search');
    return;
  }

  let wasFound = false;

  for (let i = 0; i < this.state.movieArray.length; i++) {
    if (this.state.movieArray[i].title.toLowerCase().includes(this.state.searchInput.toLowerCase())) {
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
          <button onClick={this.activeWatch} className="watched">Watched</button>
          <button onClick={this.activeToWatch} className="to-watch">To Watch</button>
          <SearchBar getData={this.getData} handleSearch={this.handleSearch}/>
        </div>

          <MovieList movies={this.state.movieArray} />

      </React.Fragment>
    )
  }
}


export default App;