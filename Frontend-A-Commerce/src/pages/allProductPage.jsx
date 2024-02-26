import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from '../components/Products/product';
import { useParams } from 'react-router-dom';

const AllProducts = () => {
    const Params = useParams()

    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/get-products/${Params.catId}`);

                if (response.data) {
                    setProductData(response.data.ProductsData);
                    setLoading(false);
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
            <div className='container my-5'>
                <div className='row my-5 d-flex flex-row justify-content-evenly flex-wrap'>
                    {loading ? <p>loading...</p> : AllProducts}
                </div>
            </div>
        </>
    );
};

export default AllProducts;
