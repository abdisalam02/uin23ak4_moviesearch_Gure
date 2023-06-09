import logo from './logo.svg';
import './App.css';
import './css/main.css';
import React, { useState, useEffect} from 'react';
import MovieList from './components/MovieCard';
import SearchBar from './components/SearchResults';


const KEY = 'dba6a593';
const URL = 'https://www.omdbapi.com/';



function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  // const[info, setInfo] = useState([]);

  // her så bruker jeg useeffect til å hente en liste med 10 james bond filmer 
  useEffect(() => {
    async function fetchMovies() {
      const url = `https://www.omdbapi.com/?s=james+bond&apikey=dba6a593&type=movie`;
      const response = await fetch(url);
      const data = await response.json();
      // const movieResults = data.Search.filter((result) => result.Type === "movie");
    // henter extra informasjon som actors, genre og directors
      if (data.Search) {
        const movies = await Promise.all
        (data.Search.slice(0, 10).map(async (movie) => {

          const url = `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=dba6a593`;
          const response = await fetch(url);
          const data = await response.json();
          
          return data;

        }));
        setMovies(movies);
      }
      
    }
    fetchMovies();

  }, []);
  const SearchChange = (event) => {
    setSearchTerm(event.target.value);
  }

  const SearchSubmit = async (event) => {
    event.preventDefault();
    //bruker en if test som returnerer resultater hvis brukeren har skrevet minimum 3 tegn 
    if (searchTerm.length >= 2) {

      const url = `${URL}?s=${searchTerm}&apikey=${KEY}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.Search) {

        const movies = await Promise.all(data.Search.map(async (movie) => {
        const movieUrl = `${URL}?i=${movie.imdbID}&apikey=${KEY}`;
        const movieResponse = await fetch(movieUrl);
        const movieData = await movieResponse.json();

        return movieData;

      }));

      setMovies(movies);

      } else {
      
        setMovies([]);
      }
    }
  }
  return (
 <div className='container'>
  <a href='/' className=''>
  <h1 className='notflix'>Not-flix</h1>
  </a>
  <SearchBar
   searchTerm={searchTerm}
   onSearchChange={SearchChange}
   onSearchSubmit={SearchSubmit}
 /> 

 <MovieList movies={movies} searchTerm={searchTerm}/>
</div>


  );
}

export default App;
