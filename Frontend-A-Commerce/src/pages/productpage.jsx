import { useParams } from 'react-router-dom';
import ShowProduct from '../components/Products/showProduct';
import { useEffect, useState } from 'react';
// import Loader from '../components/loader'
import axios from 'axios';


const ProductPage = () => {

    const [productData, setProductData] = useState(null);
    const [loading, setLoading] = useState(true);

    const Params = useParams();

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/get-product/${Params.id}`);

            if (response.data.productData) {
                setProductData(response.data.productData);
            }
            setLoading(false);
        } catch (err) {
            console.error("Error Found: ", err);
        }
    };
    useEffect(() => {

        fetchData();
    }, []);



    const Products = () => {
        if (loading) {
            return <p>LOADING...</p>;
        }

        if (!productData) {
            return <p>No product found.</p>;
        }

        return (
            <ShowProduct
                key={productData.id}
                sellerId={productData.sellBy}
                id={productData.id}
                img={productData.images}
                productName={productData.name}
                productDescription={productData.description}
                price={productData.price}
            />
        );
    };

    return (
        <>
            <div className='d-flex flex-row justify-content-evenly flex-wrap'>
                <Products />
            </div>
        </>
    );
};

export default ProductPage;
