import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Filter from '../components/filter'
import SearchedProduct from '../components/Products/searchedProduct';

const SearchResultPage = () => {
    const Params = useParams();

    const [productsData, setProductsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://a-commerce-server.onrender.com/get-searched-products/${Params.searchedKey}`);

                if (response.data) {
                    setProductsData(response.data.data);
                    setLoading(false)
                }
            } catch (err) {
                console.error("Error Found: ", err);
            }
        };

        fetchData();


    }, [Params.searchedKey]);

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
        <div className='d-flex flex-row justify-content-between container'>

            <div className='filter my-5 mx-3 col-2'>
                <Filter/>
            </div>
            <div className='mx-3 d-flex flex-row justify-content-evenly flex-wrap col-10'>
                {loading ? <p>loading...</p> : SearchResults}
            </div>

        </div>
    );
}

export default SearchResultPage;
