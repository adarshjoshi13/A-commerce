import axios from "axios";
import { useState, useEffect } from "react";
import CartProduct from "../components/Products/cartProduct";
import Cookies from "js-cookie";

export default function CartProducts() {
    const [userCartSelectedProducts, setUserCartSelectedProducts] = useState([]);
    const [loader, setLoader] = useState(false);
    const cookies = Cookies.get();
    const BuyerId = cookies.BuyerId

    const getUserCartData = async () => {
        try {
            const response = await axios.get(`https://a-commerce-server.onrender.com/get-user-cart/${BuyerId}`);
            
            if (response && response.data) {
                setUserCartSelectedProducts(response.data.data);
                setLoader(true);
            }   
        } catch (error) {
            console.error('Error while fetching user cart data:', error);
        }
    };

    useEffect(() => {
        if (BuyerId) {
            getUserCartData();
        } else {
            setLoader(true);
        }
    }, [BuyerId]);

    const refreshCartData = async () => {
        // Fetch cart data again when this function is called
        await getUserCartData();
    };

    const CartProducts = userCartSelectedProducts.length > 0 ? (
        userCartSelectedProducts.map((value, index) => (
            <CartProduct
                key={index}
                id={value.id}
                productName={value.name}
                productDescription={value.description}
                price={value.price}
                refresh={refreshCartData}
            />
        ))
    ) : (
        <>
            <h3 className="text-center fw-bold my-4">WHY YOUR CART IS EMPTY ?</h3>
        </>
    );

    return (
        <div className="container my-5">
            {loader ? CartProducts : <p>loading...</p>}
        </div>
    );
}
