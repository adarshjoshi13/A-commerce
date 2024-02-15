import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from '../components/product';

const Home = () => {
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/get-product-data');

                if (response.data) {
                    setProductData(response.data.ProductsData);
                }
            } catch (err) {
                console.error("Error Found: ", err);
            }
        };

        fetchData();
    }, [])

    const AllProducts = productData.map((value, index) => (
        <Product
            key={index}
            id={value.id}
            productName={value.name}
            productDescription={value.description}
            price={value.price}
        />
    ))

    return (
        <>
            <div className='d-flex flex-row justify-content-evenly flex-wrap'>
                {AllProducts}
            </div>
        </>
    );
};

export default Home;
