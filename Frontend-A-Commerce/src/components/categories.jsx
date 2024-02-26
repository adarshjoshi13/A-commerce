import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function Categories() {

    const [categoriesData, setcategoriesData] = useState()
    const [Loading, setLoading] = useState()

    const GetCategories = async () => {
        try {
            const Categories = await axios.get(`http://localhost:3000/get-categories`);

            if (Categories) {
                setcategoriesData(Categories.data.data);
                setLoading(true);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        GetCategories()
    }, [])


    const Categories = categoriesData ? (
        categoriesData.map((value) => (
            <Link to={`/products/${value.id}`} key={value.id} className='category-link col-2'>
                <div id={value.id} className='category-item card text-center'>
                    <img className='category-image card-img-top img-fluid' src={`./${value.image}.png`} alt={`${value.name} Image`} />
                    <div className='card-body'>
                        <h5 className='card-title'>{value.name.toUpperCase()}</h5>
                    </div>
                </div>
            </Link>
        ))
    ) : <p className='text-center'>loading...</p>;

    return (
        <div className='container mt-5'>
            <div className='row d-flex justify-content-center flex-row'>
                {Categories}
            </div>
        </div>
    );

}