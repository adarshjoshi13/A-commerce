import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function ShowProduct(props) {
    const [userWishlistData, setUserWishlistData] = useState([]);
    const [userId, setUserId] = useState(Cookies.get('userId'));

    const Naviagte = useNavigate()

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
        if (userId) {
            GetUserData();
        }

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

        if (!userId) {

        }
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
        <div id={props.id} className="container my-5">
            
            <div className="row">
                <div className="col-md-6">
                    <img src={`./public/${props.id}.png`} className="img-fluid" alt={`${props.productName} Image`} />
                </div>
                <div className="col-md-6">
                    <h1 className="display-4">{props.productName}</h1>
                    <p className="lead">{props.productDescription}</p>
                    <p className="display-5 fw-bold">₹{props.price}</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <Link to={`/product-purchase/${props.id}`}>
                            <button type="button" className="btn btn-primary">Buy Now</button>
                        </Link>
                        <div className="d-flex justify-content-between">
                            <button type="button" className="btn btn-primary mx-3" onClick={() => {
                                if (userId) {
                                    AddCart(props.id);
                                } else {
                                    Naviagte('/login');
                                }
                            }} >
                                Add To Cart
                            </button>
                            {userWishlistData.includes(props.id) ? (
                                <i
                                    className="fs-3 m-0 p-0 bi bi-heart-fill"
                                    role="button"
                                    onClick={() => {
                                        RemoveFromWishlist(props.id);
                                    }}
                                ></i>
                            ) : (
                                <i
                                    className="fs-3 m-0 p-0 bi bi-heart"
                                    role="button"
                                    onClick={() => {
                                        if (userId) {
                                            AddWishlist(props.id);
                                        } else {
                                            Naviagte('/login');
                                        }
                                    }}
                                ></i>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );

}
