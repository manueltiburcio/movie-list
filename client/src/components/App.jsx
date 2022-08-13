import React from 'react';
import axios from 'axios';
import exampleMovieData from '../data/exampleMovieData.js';
import MovieHeader from './MovieHeader.jsx';
import AddMovie from './AddMovie.jsx';
import MovieList from './MovieList.jsx';
import SearchBar from './SearchBar.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentList: [],
      moviesList: [],
      searchInput: '',
    };

    this.watchedArray = [];
    this.toWatchArray = [];

    this.getData = this.getData.bind(this);
    this.addMovie = this.addMovie.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.activeWatch = this.activeWatch.bind(this);
    this.activeToWatch = this.activeToWatch.bind(this);

  }


  componentDidMount() {
    axios.get('/movies')
    .then(response => {
      console.log(response.data);
      response.data.forEach(movie => {
        this.setState({
          currentList: [...this.state.currentList, {
            id: movie.id,
            title: movie.title,
            watch: Math.random() < 0.5,
          }],
        })
      })
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  }

  activeWatch(e) {
    e.preventDefault();

    // if (this.state.movieList.length > 0) {
    //   for (let i = 0; i < this.state.movieList.length; i++) {
    //     if (this.state.movieList[i].watch === true) {
    //       this.watchedArray.push({title: this.state.movieList[i].title, watch: true,})
    //     }
    //    }
    // }

    for (let i = 0; i < this.state.currentList.length; i++) {
      if (this.state.currentList[i].watch === true) {
        this.watchedArray.push({title: this.state.currentList[i].title, watch: true,})
      }
     }

     this.setState({
      moviesList: [...this.state.currentList],
    })

     this.setState({
      currentList: [...this.watchedArray]
    })

  }

  activeToWatch(e) {

    for (let i = 0; i < this.state.currentList.length; i++) {
      if (this.state.currentList[i].watch === false) {
        this.toWatchArray.push({title: this.state.currentList[i].title, watch: false,})
      }
     }

     this.setState({
      moviesList: [...this.state.currentList],
    })

     this.setState({
      currentList: [...this.toWatchArray]
    })

  }

  // TODO home handler get all list back
  handleHome(e) {

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

    // add movies to db
    axios.post('/movies', {
      title: this.state.searchInput,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    // get all movies with the updated one
    axios.get('/movies')
    .then(response => {
      // handle success
      this.setState({
        currentList: response.data,
      })
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });



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

  for (let i = 0; i < this.state.currentList.length; i++) {
    if (this.state.currentList[i].title.toLowerCase().includes(this.state.searchInput.toLowerCase())) {

      this.setState({
        movieList: [...this.state.currentList],
        currentList: [{title: this.state.currentList[i].title}],
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

          <MovieList movies={this.state.currentList} />

      </React.Fragment>
    )
  }
}


export default App;