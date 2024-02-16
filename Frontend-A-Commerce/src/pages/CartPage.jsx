import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import CartProduct from "../components/cartProduct"
import Cookies from "js-cookie"
export default function CartProducts() {

    const [userCartSelectedProducts, setUserCartSelectedProducts] = useState([])
    const [loader, setLoader] = useState(false)
    let userId = Cookies.get('userId')

    useEffect(() => {
        if (userId) {
            const GetUserCartData = async () => {
                try {
                    const response = await axios.get(`http://localhost:3000/get-user-cart/${userId}`);

                    if (response && response.data) {
                        setUserCartSelectedProducts(response.data.data);
                        setLoader(true);
                    }
                } catch (error) {
                    console.error('Error fetching user cart data:', error);
                }

            }

            GetUserCartData()
        } else {
            setLoader(true);
        }

    }, [])

    console.log(userCartSelectedProducts)

    const CartProducts =
        userCartSelectedProducts.length > 0 ? (
            userCartSelectedProducts.map((value, index) => (
                <CartProduct
                    key={index}
                    id={value.id}
                    productName={value.name}
                    productDescription={value.description}
                    price={value.price}
                />
            )
            )) : (
            <>
                <h3 className="text-center fw-bold my-4">YOUR CART IS EMPTY</h3>
                {userId? null: <h4 className="fw-bold text-center">Please Sign In To Fill</h4>}
            </>
        )


    return (

        <div>
            {loader ? CartProducts : <p>loading...</p>}
        </div>
    )
}
