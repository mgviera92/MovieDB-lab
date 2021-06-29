import React, { Component } from 'react';
import './App.css';
import MovieRow from './MovieRow';
import $ from 'jquery'


class App extends Component {
  constructor(props) {
    super(props)
    this.state ={}
 

  this.performSearch("")
}
performSearch(searchTerm) {
  console.log("Búsqueda en TMDB")
  const urlString = "https://api.themoviedb.org/3/search/movie?api_key=ba70bcfe468c51c6320a9f1b44ad7d7f&query=" + searchTerm
  $.ajax({
    url: urlString,
    success: (searchResults) => {
      console.log("Búsqueda exitosa")
      // console.log(searchResults)
      const results = searchResults.results
      // console.log(results[0])

      var movieRows = []

      results.forEach((movie) => {
        movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path
        // console.log(movie.poster_path)
        const movieRow = <MovieRow key={movie.id} movie={movie}/>
        movieRows.push(movieRow)
      })

      this.setState({rows: movieRows})
    },
    error: (xhr, status, err) => {
      console.error("La búsqueda NO fue exitosa")
    }
  })
}
  
searchChangeHandler(event) {
  console.log(event.target.value)
  const boundObject = this
  const searchTerm = event.target.value
  boundObject.performSearch(searchTerm)
}

  render() {

    return (
      <div className="App">
      
        <table className="titleBar">
          <tbody>
           <tr>
              <td>
                <img alt="app icon" width="60" src="green_mdb.svg"/>
              </td>
             <td width="8"/>
              <td>
               <h1>The Movie Data Base</h1>
              </td>
            </tr>
          </tbody>
        </table>

        <input style={{
          fontSize: 24,
          display:'block',
          width: "99%",
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 16,
          backgroundColor: 'black',
          color: 'lime',
          }}  onChange={this.searchChangeHandler.bind(this)} placeholder="Ingrese su búsqueda"/>
        
          {this.state.rows}

      </div>
      );
    }
}


export default App;
