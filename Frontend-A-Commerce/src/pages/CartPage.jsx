import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import CartProduct from "../components/cartProduct"
import Cookies from "js-cookie"
export default function CartProducts() {

    const [userCartSelectedProducts, setUserCartSelectedProducts] = useState([])
    const [loader, setLoader] = useState(false)
    let userId = Cookies.get('userId')
    console.log(userId)
    useEffect(() => {

        const GetUserCartData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/get-user-product/${userId}`);

                if (response && response.data) {
                    setUserCartSelectedProducts(response.data.data);
                    setLoader(true);
                }
            } catch (error) {
                console.error('Error fetching user cart data:', error);
            }

        }

        GetUserCartData()
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
            )) : (<p>You Cart Is Empty.</p>)


    return (

        <div>
            {loader ? CartProducts : <p>loading...</p>}
        </div>
    )
}
