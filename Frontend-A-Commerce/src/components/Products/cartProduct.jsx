import axios from "axios"
import { Link } from "react-router-dom"
import Cookies from "js-cookie"

export default function CartProduct(props) {
    const userId = Cookies.get('userId')

    const RemoveFromCart = async (ProductId) => {
        let productId = ProductId
        try {
            const RemoveProduct = await axios.post('http://localhost:3000/remove-from-cart', { userId, productId }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (RemoveProduct) {
                props.refresh()
            }
        } catch (ERR) {
            console.log("ERROR FOUND: ", ERR)
        }

    }

    return (
        <div id={props.id} className="cart-product-box p-3 mb-3">
            <Link to={`/product-page/${props.productName}/${props.id}`} className='cart-text-reset cart-text-decoration-none'>
                <h2 className="cart-product-title">{props.productName}</h2>
            </Link>

            <p className="cart-product-description">{props.productDescription}</p>
            <h3 className="cart-product-price">₹{props.price}</h3>

            <div className="d-flex justify-content-end mt-3">
                <button type="button" className="btn btn-danger" onClick={() => { RemoveFromCart(props.id) }}>Delete</button>
            </div>
        </div>
    );

}