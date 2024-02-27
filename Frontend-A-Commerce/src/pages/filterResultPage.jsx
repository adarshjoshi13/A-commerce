import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Filter from '../components/filter'
import SearchedProduct from '../components/Products/searchedProduct';

const FilterResultPage = () => {
    const FilterKeys = useParams();
    const [productsData, setProductsData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/get-filter-products/?name=${FilterKeys.searchedKey}&sort=${FilterKeys.sort}`);
            if (response.data) {
                setProductsData(response.data.data);
                setLoading(false)
            }
        } catch (err) {
            console.error("Error Found: ", err);
        }
    };

    useEffect(() => {
        fetchData();
    }, [FilterKeys]);

    const SearchResults = productsData.length > 0 ? productsData.map((value, index) => (
        <SearchedProduct
            key={index}
            id={value.id}
            productName={value.name}
            productDescription={value.description}
            price={value.price}
        />
    )) : null;

    return (
        <div className='container'>
          <div className='row my-5 d-flex flex-row justify-content-between'>
            <div className='filter col-2 my-5'>
              <Filter />
            </div>
            <div className='d-flex flex-row justify-content-evenly flex-wrap col-9'>
              {loading ? <p>loading...</p> : SearchResults}
            </div>
          </div>
        </div>
      );
      
}

export default FilterResultPage;
