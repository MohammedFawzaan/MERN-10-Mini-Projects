import axios from 'axios';
import { useState } from 'react';
import Card from './Card';

function MovieFinder() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [searches, setSearches] = useState([]);
  const API_KEY = 'c7afd27';

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${input}`);
      console.log(response.data);
      if (response.data.Search) {
        setSearches(response.data.Search);
        setError(null);
      } else {
        setSearches([]);
        setError("Data Not Found");
      }
    } catch (error) {
      console.log(error);
      setSearches([]);
      setError(error);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(input.trim()) {
      fetchData();
    } else {
      setSearches([]);
      setError('Please enter a valid search term');
    }
  }

  return (
    <div>
      <div>
        <h1>Movie List</h1>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={(event) => handleSubmit(event)}>Search</button>
        <p>{input}</p>
        {error && <p>{error}</p>}
        {searches && searches.map((element, index) => {
          return <Card key={element.imdbID} movie={element} />
        })}
      </div>
    </div>
  )
}

export default MovieFinder