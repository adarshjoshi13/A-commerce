import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function ShowProduct(props) {
    const [userWishlistData, setUserWishlistData] = useState([]);
    const [userId, setUserId] = useState(Cookies.get('userId'));
    const [loading, setLoading] = useState(false);

    const GetUserData = async () => {
        try {
            const userData = await axios.get(`http://localhost:3000/get-user-data/${userId}`);
            if (userId) {
                setUserWishlistData(userData.data.data.inWishlist);
                setLoading(true);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const refresh = async () => {
        await GetUserData()
    }

    useEffect(() => {

        GetUserData();

    }, []);

    const AddCart = async (id) => {
        try {
            const UpdateUserCart = await axios.post('http://localhost:3000/add-cart', { productId: id, userId }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (UpdateUserCart) {
                console.log("Added to cart successfully");
            }
        } catch (err) {
            console.log("ERROR FOUND: ", err);
        }
    };

    const AddWishlist = async (id) => {
        try {
            const UpdateUserWishlist = await axios.post('http://localhost:3000/add-wishlist', { productId: id, userId }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (UpdateUserWishlist) {
                console.log("Added to wishlist successfully");
                refresh()
            } else {
                console.log("Unsuccessful To Add data");
            }
        } catch (err) {
            console.log("ERROR FOUND: ", err);
        }
    };

    const RemoveFromWishlist = async (ProductId) => {
        let productId = ProductId
        try {
            const RemoveWishlist = await axios.post('http://localhost:3000/remove-from-wishlist', { userId, productId }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (RemoveWishlist) {
                console.log("removed successfully from wishlist")
                refresh()
            }
        } catch (ERR) {
            console.log("ERROR FOUND: ", ERR)
        }

    }


    return (
        <>
            {loading ?
                (
                    <div id={props.id} className="product-box p-3 d-flex flex-column justify-content-center align-content-center m-2 my-5">
                        <h1>{props.productName}</h1>
                        <p>{props.productDescription}</p>
                        <p>{props.price}</p>

                        <div className="d-flex justify-content-between align-items-center">
                            <Link to={`/product-page/${props.id}`}><button type="btn" className="btn-primary btn">Purchase</button></Link>

                            <div className="d-flex justify-content-between">
                                <button type="btn" className="btn-primary btn mx-3" onClick={() => { AddCart(props.id) }}>Add To cart</button>
                                {
                                    userWishlistData.includes(props.id) ?
                                        <i className="fs-3 m-0 p-0 bi bi-heart-fill" role="button" onClick={() => { RemoveFromWishlist(props.id) }}></i> :
                                        <i className="fs-3 m-0 p-0 bi bi-heart" role="button" onClick={() => { AddWishlist(props.id) }}></i>
                                }
                            </div>
                        </div>
                    </div>
                ) :
                (
                    <p>LOADING...</p>
                )}

        </>
    );
}
