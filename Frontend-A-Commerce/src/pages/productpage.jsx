import { useParams } from 'react-router-dom'
import Product from '../components/product'
import { useEffect, useState } from 'react';
import axios from 'axios';



const ProductPage = () => {

    const id = useParams();

    const [productData, setProductData] = useState([]);

    useState(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/get-data', {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (response.data) {
                    setProductData(response.data.ProductsData);
                }
            } catch (err) {
                console.error("Error Found: ", err);
            }
        };

        fetchData();
    }, [])

    const products = productData.map((value, index) => {
        console.log("working")
        if (value.id === +id.id) {
            console.log("working")
            return (
                <Product
                    key={index}
                    id={value.id}
                    productName={value.name}
                    productDescription={value.description}
                    price={value.price}
                />
            )
        }
    })
    console.log({ products })

    return (
        <>
            <div className='d-flex flex-row justify-content-evenly flex-wrap'>
                {products}
            </div>
        </>
    )
}

export default ProductPage 