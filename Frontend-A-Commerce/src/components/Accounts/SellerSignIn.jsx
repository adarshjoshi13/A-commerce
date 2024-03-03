import axios from "axios"
import { useState } from "react"
import Cookies from "js-cookie"
import { Link, useNavigate } from "react-router-dom"
import Alert from "../alert"

export default function SellerSignIn() {
    const Navigate = useNavigate()
    const [Msg, setMsg] = useState()
    const [showAlert, setShowAlert] = useState();
    const [FormData, setFormData] = useState({
        mail: "",
        password: ""
    })

    function handleChange(key) {

        const { id, value } = key

        setFormData((prev) => ({
            ...FormData, [id]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await axios.post('http://localhost:3000/seller-sign-in', FormData, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,
        });

        if (response.data.success) {
            let SellerId = response.data.data.userData.id;
            Cookies.set('SellerId', SellerId, { secure: true, expires: 7, sameSite: 'Strict' });
            window.location.replace('/dashboard');
        } else {
            setMsg(response.data.msg); // Assuming response.data.msg contains the error message
            setShowAlert(true);
        }
    }

    const handleAlertClose = () => {
        setShowAlert(false);
    };
    return (
        <>
            {showAlert && (
                <Alert
                    message={Msg}
                    type="danger"
                    onClose={handleAlertClose}
                />
            )}

            <div className="login-container">
                <div className="welcome-container">
                    <h1 className="text-center mb-4">Greetings, Sellers!</h1>
                    <p className="text-center mb-4">Ready to sell your good in the vibrant marketplace.</p>
                </div>
                <div className="sign-in-form">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="mail" className="form-label">Email</label>
                            <input
                                type="text"
                                className="form-control"
                                id="mail"
                                onChange={(e) => { handleChange(e.target) }}
                                placeholder="Email or Number"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <div className="d-flex justify-content-between align-items-ceenter">
                                <label htmlFor="password" className="form-label">Password</label>
                                <Link to={'/seller-signin'}>
                                    <p style={{ fontFamily: "normal", textDecoration: "underline" }}>Forget Password?</p>
                                </Link>

                            </div>

                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                onChange={(e) => { handleChange(e.target) }}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Sign In</button>
                    </form>


                </div>


                <div className="my-4 d-flex justify-content-center align-items-center">
                    <span className="mr-2 line"></span> <h4 className="text-center m-0">New To A Commerce?</h4>  <span className="ml-2 line"></span>
                </div>

                <div className="my-4 create-account d-flex justify-content-center align-items-center">
                    <button type="button" className="btn btn-success" onClick={() => { Navigate('/seller-signup') }}>Create Your Seller Account</button>
                </div>
            </div>
        </>
    );
}