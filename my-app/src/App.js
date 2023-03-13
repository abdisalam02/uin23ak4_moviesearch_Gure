import logo from './logo.svg';
import './App.css';
import './css/main.css';
import React, { useState, useEffect} from 'react';
import MovieList from './components/MovieCard';
import SearchBar from './components/SearchResults';

// const API_URL = 'http://www.omdbapi.com?apikey=dba6a593';
const API_KEY = 'dba6a593';
const BASE_URL = 'https://www.omdbapi.com/';



function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    async function fetchMovies() {
      const url = `https://www.omdbapi.com/?s=james+bond&apikey=dba6a593`;
      const response = await fetch(url);
      const data = await response.json();
      const movieResults = data.Search.filter((result) => result.Type === "movie");
      if (data.Search) {
        const movies = data.Search.slice(0, 10);
        setMovies(movies);
      }
      
    }
    fetchMovies();
  }, []);
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  }

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    if (searchTerm.length >= 3) {
      const url = `${BASE_URL}?s=${searchTerm}&apikey=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.Search) {
        const movies = data.Search;
        setMovies(movies);
      } else {
        setMovies([]);
      }
    }
  }
  return (
 <div className='container'>
  <h1 className='notflix'>Not-flix</h1>
  <SearchBar
   searchTerm={searchTerm}
   onSearchTermChange={handleSearchTermChange}
   onSearchSubmit={handleSearchSubmit}
 /> 

 <MovieList movies={movies} searchTerm={searchTerm}/>
</div>


  );
}

export default App;
