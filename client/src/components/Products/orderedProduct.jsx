import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import { useState } from "react";

export default function OrderedProduct(props) {
    const Navigate = useNavigate()
    const cookies = Cookies.get();
    const BuyerId = cookies.BuyerId

    const CancelOrder = async (ProductId) => {


        let productId = ProductId
        try {
            const RemoveWishlist = await axios.post('http://localhost:3000/cancel-order', { BuyerId, productId }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (RemoveWishlist) {
                console.log("product order cancelled successfully")
                props.refresh()
            }
        } catch (ERR) {
            console.log("ERROR FOUND: ", ERR)
        }

    }

    return (
        <>

            <div id={props.id} className="product-box p-3 d-flex flex-column justify-content-center align-content-center m-2 my-5">
                <Link to={`/product-page/${props.id}`} className='text-reset text-decoration-none'>
                    <h1 >{props.productName}</h1>
                </Link>

                <p>{props.productDescription}</p>
                <h3>{props.price}</h3>

                <div className="d-flex justify-content-start ">
                    <button type="btn" className="btn-primary btn" onClick={() => {
                        const userConfirmed = window.confirm("Are you sure you want to cancel the order?");
                        if (userConfirmed) {
                            CancelOrder(props.id);
                        }

                    }} >Cancel Order</button>
                    <button type="btn" className="btn-success btn mx-3" onClick={() => {
                        Navigate(`/track-order/${props.id}`)
                    }}>TrackOrder</button>
                </div>
            </div>

        </>
    )
}