import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { searchShoes } from '../../store/shoes';
import { useHistory} from 'react-router-dom/cjs/react-router-dom.min';
import './NavBar.css';

const SearchBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]); // Local state for dropdown

  useEffect(() => {
    const search = async () => {
      if (searchQuery) {
        const shoes = await dispatch(searchShoes(searchQuery));
        if (shoes) {
          setSearchResults(shoes.slice(0, 5));
        }
      } else {
        setSearchResults([]);
      }
    };

    // Execute the search when the searchQuery changes
    search();
  }, [dispatch, searchQuery]);

  const handleInputChange = async (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search for shoes"
        id="search-bar"
        value={searchQuery}
        onChange={handleInputChange}
      />
      {searchResults.length > 0 && (
        <div className="search-results-dropdown">
            {console.log(searchResults)}
          {searchResults.map((result) => (
            // Render each search result as needed
            <div key={result._id} className="search-result-item" onClick={() => { 
                history.push(`/shoes/${result._id}`);
                setSearchQuery('');
                setSearchResults([]);
                }}>
                <img src={`http://localhost:5000/images/${result.photoUrl}`} />
                <span>{result.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;