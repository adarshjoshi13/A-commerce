import { Link } from "react-router-dom"
import axios from "axios"
import Cookies from "js-cookie"

export default function ShowProduct(props) {

    const [userData, setUserData] = useHook({})
    const userId = Cookies.get('userId')

    const GetUserData = async () => {
        const userData = await axios.get(`http://localhost:3000/get-user-data/${userId}`)
        if(userId) {
            setUserData(userData.data)
        }
    }

    const AddCart = async (id) => {
        let productId = id
        try {
            const UpdateUserCart = await axios.post('http://localhost:3000/add-cart', { productId, userId }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (UpdateUserCart) {
                console.log("added to cart successfully")
            }
        } catch (err) {
            console.log("ERROR FOUND: ", err)
        }
    }

    const AddWishlist = async (id) => {
        let productId = id
        try {
            const UpdateUserWishlist = await axios.post('http://localhost:3000/add-wishlist', { productId, userId }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (UpdateUserWishlist) {
                console.log("added to wishlist successfully")
            }
        } catch (err) {
            console.log("ERROR FOUND: ", err)
        }
    }


    return (
        <>
            <div id={props.id} className="product-box p-3 d-flex flex-column justify-content-center align-content-center m-2 my-5">
                <h1>{props.productName}</h1>
                <p>{props.productDescription}</p>
                <p>{props.price}</p>

                <div className="d-flex justify-content-between align-items-center">
                    <Link to={`/product-page/${props.id}`}><button type="btn" className="btn-primary btn">Purchase</button></Link>

                    <div className="d-flex justify-content-between">
                        <button type="btn" className="btn-primary btn mx-3" onClick={() => { AddCart(props.id) }}>Add To cart</button>


                        <i className="fs-3 m-0 p-0 bi bi-heart" role="button" onClick={() => { AddWishlist(props.id) }}></i>

                    </div>
                </div>
            </div>
        </>
    )
}