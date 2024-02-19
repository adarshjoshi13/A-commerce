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



    const Categories =
        categoriesData ?
            (categoriesData.map((value, index) => {
                return (
                    <Link to={`/products/${value.id}`} key={value.id} className='my-3 mx-5 text-reset text-decoration-none'>
                        <div id={value.id} className='d-flex flex-column justify-content-center align-items-center p-0'>
                            <img className='img-fluid' src={`./public/${value.image}.png`} style={{ width: 100 }} />
                            <h5 className='fw-bold text-center my-3'>{value.name.toUpperCase()}</h5>
                        </div>
                    </Link>
                )
            })) :
            (null)




    return (
        <>
            {Categories}
        </>
    )
}