import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Filter = () => {
    const Params = useParams()
    const Navigate = useNavigate()

    const [filters, setFilters] = useState({
        sortBy: ""
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(filters);

        Navigate(`/filter-results/${Params.searchedKey}/${filters.sortBy}`)

    };

    // Filter component
    return (
        <div className='border p-3'>
            <form onSubmit={handleSubmit}>
                <h2 className='mb-3'>Filter</h2>
                <div className="mb-3">
                    <label htmlFor="sortBy" className="form-label">
                        Sort By:
                    </label>
                    <select
                        id="sortBy"
                        name="sortBy"  // add name attribute for the handleChange function
                        className="form-select"
                        value={filters.sortBy}
                        onChange={handleChange}
                    >
                        <option value="price_low_to_high">Choose price</option>
                        <option value="0">Price Low to High</option>
                        <option value="1">Price High to Low</option>
                    </select>
                </div>

                {/* Add more input fields with similar structures */}

                <button type="submit" className="btn btn-success">
                    Apply Filters
                </button>
            </form>
        </div>
    );
};

export default Filter;
