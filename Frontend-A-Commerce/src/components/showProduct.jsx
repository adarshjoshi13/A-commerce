import { Link } from "react-router-dom"
import axios from "axios"
import Cookies from "js-cookie"

export default function ShowProduct(props) {

    const userId = Cookies.get('userId')
    console.log(userId)

    const AddCart = async (id) => {
        let productId = id
        console.log(productId)
        console.log(userId)

        const UpdateUserCart = await axios.post('http://localhost:3000/add-cart', { productId, userId }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (UpdateUserCart) {
            console.log("added to cart successfully")
        }
    }


    return (
        <>
            <div id={props.id} className="product-box p-3 d-flex flex-column justify-content-center align-content-center m-2 my-5">
                <h1>{props.productName}</h1>
                <p>{props.productDescription}</p>
                <p>{props.price}</p>

                <div className="d-flex justify-content-between ">
                    <Link to={`/product-page/${props.id}`}><button type="btn" className="btn-primary btn">Purchase</button></Link>
                    <button type="btn" className="btn-primary btn" onClick={() => { AddCart(props.id) }}>Add To cart</button>
                </div>
            </div>
        </>
    )
}