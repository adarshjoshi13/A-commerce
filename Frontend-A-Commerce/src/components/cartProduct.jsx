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
        <>

            <div id={props.id} className="product-box p-3 d-flex flex-column justify-content-center align-content-center m-2 my-5">
                <Link to={`/product-page/${props.productName}/${props.id}`} className='text-reset text-decoration-none'>
                    <h1 >{props.productName}</h1>
                </Link>

                <p>{props.productDescription}</p>
                <h3>{props.price}</h3>

                <div className="d-flex justify-content-between ">
                    <button type="btn" className="btn-primary btn" onClick={() => { RemoveFromCart(props.id) }} >Delete</button>
                </div>
            </div>

        </>
    )
}