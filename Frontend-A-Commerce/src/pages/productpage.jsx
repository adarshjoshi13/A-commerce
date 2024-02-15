import { useParams } from 'react-router-dom';
import CartShowProduct from '../components/cartShowProduct';
import { useEffect, useState } from 'react';
// import Loader from '../components/loader'
import axios from 'axios';


const ProductPage = () => {

    const [productData, setProductData] = useState(null);
    const [loading, setLoading] = useState(true);

    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/get-product/${id}`);

                if (response.data.productData) {
                    setProductData(response.data.productData);
                }
                setLoading(false);
            } catch (err) {
                console.error("Error Found: ", err);
            }
        };

        fetchData();
    }, [id]);

    const Products = () => {
        if (loading) {
            return <p>LOADING...</p>;
        }

        if (!productData) {
            return <p>No product found.</p>;
        }

        return (
            <CartShowProduct
                key={productData.id}
                id={productData.id}
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
