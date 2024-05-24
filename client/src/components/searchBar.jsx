import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { Link, useNavigate } from 'react-router-dom';

export default function SearchBar() {
    const Navigate = useNavigate()
    const [searchKey, setSearchKey] = useState("");
    const [searchRelatedResults, setSearchRelatedResults] = useState([]);

    const getSearchResult = async (key) => {
        try {
            const relatedSearchData = await axios.get(`https://a-commerce-server.onrender.com/get-search-result/${key}`);
            setSearchRelatedResults(relatedSearchData.data.data || []);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    const debouncedSearch = debounce(getSearchResult, 190);

    useEffect(() => {
        if (searchKey === "") {
            setSearchRelatedResults([]);
            debouncedSearch.cancel();
        } else {
            debouncedSearch(searchKey);
        }

        return () => debouncedSearch.cancel();
    }, [searchKey]);

    const handleChange = (e) => {
        setSearchKey(e.target.value);      
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (searchKey) {
            Navigate(`/search-results/${searchKey}`);
          }

    };

    const searchSuggestions = searchRelatedResults.map((value, index) => (
        <Link to={`/search-results/${value.name}`} className='text-decoration-none text-black'>
            <li key={index} className="m-0 p-0">{value.name}</li>
        </Link>
    ));

    return (
        <div className="search-container mx-5">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="searchInput"
                    onChange={handleChange}
                    value={searchKey}
                    placeholder="Search Your Need..."
                />

                <button type="submit" id="searchButton"> Search </button>

                {searchRelatedResults.length > 0 && (
                    <ul className="m-0 p-0" id="results">
                        {searchSuggestions}
                    </ul>
                )}
            </form>
        </div>
    );
}
