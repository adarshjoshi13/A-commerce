import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import CartProduct from "../components/cartProduct"
export default function CartProducts() {

    const [userCartSelectedProducts, setUserCartSelectedProducts] = useState([])
    const [loader, setLoader] = useState(false)
    useEffect(async () => {
        const response = await axios.get(`http://localhost:3000/get-user-product/${userId}`)
        if (response) {
            setUserCartSelectedProducts(response.data)
            setLoader(true)
        }
    }, [])

    const CartProducts = userCartSelectedProducts.map((value, index) => {
        return (
            <>
                <CartProduct
                    key={index}
                    id={value.id}
                    productName={value.name}
                    productDescription={value.description}
                    price={value.price}
                />
            </>
        )
    })
    return (

        <div>
            {loader ? (
                CartProducts.length > 0 ? (
                    CartProducts
                ) : (
                    <p>No products in the cart.</p>
                )
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}
