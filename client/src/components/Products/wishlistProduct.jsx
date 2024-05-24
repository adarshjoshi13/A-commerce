import axios from "axios"
import { Link } from "react-router-dom"
import Cookies from "js-cookie"
import { useState } from "react";

export default function WishlistProduct(props) {

    const cookies = Cookies.get()
    const BuyerId = cookies.BuyerId


    const RemoveFromWishlist = async (ProductId) => {
        let productId = ProductId
        try {
            const RemoveWishlist = await axios.post('http://localhost:3000/remove-from-wishlist', { BuyerId, productId }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (RemoveWishlist) {
                console.log("removed successfully from wishlish")
                props.refresh()
            }
        } catch (ERR) {
            console.log("ERROR FOUND: ", ERR)
        }

    }

    return (
        <div id={props.id} className="wishlist-product-box p-3 mb-3">
            <Link to={`/product-page/${props.productName}/${props.id}`} className='wishlist-text-reset wishlist-text-decoration-none'>
                <h2 className="wishlist-product-title">{props.productName}</h2>
            </Link>

            <p className="wishlist-product-description">{props.productDescription}</p>
            <h3 className="wishlist-product-price">₹{props.price}</h3>

            <div className="d-flex justify-content-between align-items-center mt-3">
                <button type="button" className="btn btn-outline-danger" onClick={() => { RemoveFromWishlist(props.id) }}>Remove</button>
            </div>
        </div>
    );


}