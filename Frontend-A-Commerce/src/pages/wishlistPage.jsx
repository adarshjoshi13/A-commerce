import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import WishlistProduct from "../components/wishlistProduct"
import Cookies from "js-cookie"

export default function WishlistPage() {

    const [userWishlistProducts, setUserWishlistProducts] = useState([])
    const [loader, setLoader] = useState(false)
    let userId = Cookies.get('userId')

    useEffect(() => {
        if (userId) {
            const GetUserWishlistData = async () => {
                try {
                    const response = await axios.get(`http://localhost:3000/get-user-wishlist/${userId}`);

                    if (response && response.data) {
                        setUserWishlistProducts(response.data.data);
                        setLoader(true);
                    }
                } catch (error) {
                    console.error('Error fetching user cart data:', error);
                    setLoader(true);
                }

            }

            GetUserWishlistData()
        } else {
            setLoader(true);
        }

    }, [])


    const WishlistProducts =
        userWishlistProducts.length > 0 ? (
            userWishlistProducts.map((value, index) => (
                <WishlistProduct
                    key={index}
                    id={value.id}
                    productName={value.name}
                    productDescription={value.description}
                    price={value.price}
                />
            )
            )) : (

            <div className="d-flex flex-column my-4">
                <i className="bi bi-emoji-frown fs-1 text-black text-center"></i>
                <h3 className="fw-bold my-2 text-center">YOUR WISHLIST IS EMPTY</h3>
            </div>

        )


    return (

        <div>
            {loader ? WishlistProducts : <p>loading...</p>}
        </div>
    )
}
