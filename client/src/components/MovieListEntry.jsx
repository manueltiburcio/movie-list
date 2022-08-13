import React from 'react';

class MovieListEntry extends React.Component {
  constructor(props) {
    super(props);

  }


  render () {
    const {
      title,
      watch,
    } = this.props;


    let style = {
      backgroundColor: !watch ? '#064635' : '#F0A500',
    }

    return (
      <div className="movie-entry">
        {title}
        <button style={style} className="btn-pending">
        {watch ? 'Watched' : 'To Watch'}
        </button>
      </div>
    )
  }
}



export default MovieListEntry;