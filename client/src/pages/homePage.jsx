import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Categories from '../components/categories';

const HomePage = () => {

    return (
        <>
            <div className='container root d-flex justify-content-center flex-wrap my-4'>
                <Categories />
            </div>
        </>
    );
};

export default HomePage;
