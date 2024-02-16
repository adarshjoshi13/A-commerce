import axios from "axios"
import { Link } from "react-router-dom"
import Cookies from "js-cookie"

export default function WishlistProduct(props) {
    const userId = Cookies.get('userId')

    const DelteFromCart = async (ProductId) => {
        let productId = ProductId
        try {
            console.log("run")
            const DeletedProduct = await axios.post('http://localhost:3000/remove-from-cart', { userId, productId }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (DeletedProduct) {
                console.log(DeletedProduct)
                console.log("deleted successfully")
                window.location.reload()
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

                <div className="d-flex justify-content-between ">
                    <button type="btn" className="btn-primary btn" onClick={() => { DelteFromCart(props.id) }} >Delete</button>
                </div>
            </div>

        </>
    )
}