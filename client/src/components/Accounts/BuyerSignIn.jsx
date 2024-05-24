import axios from "axios"
import { useState } from "react"
import Cookies from "js-cookie"
import { Link, useNavigate } from "react-router-dom"
import Alert from "../alert"

export default function BuyerSignIn() {
    const Navigate = useNavigate()

    const [errorMsg, setErrorMsg] = useState()
    const [showAlert, setShowAlert] = useState();
    const [FormData, setFormData] = useState({
        identifier: "",
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
        try {
            const response = await axios.post('https://a-commerce-server.onrender.com/buyer-sign-in', FormData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response && response.data.success) {
                let BuyerId = response.data.data.userData.id;
                let token = response.data.data.userToken;
                localStorage.setItem('token', token);
                Cookies.set('BuyerId', BuyerId, { secure: true, expires: 7, sameSite: 'Strict' });
                window.location.replace('/');
            } else {
                console.log("Authentication failed:", response.data.msg);
            }
        } catch (error) {
            console.error("Error during form submission:", error);
            setErrorMsg(error.response.data.msg);
            setShowAlert(true)
        }
    };

    function handleAlertClose() {
        setShowAlert(false)
    }


    return (
        <>
            {showAlert && (
                <Alert
                    message={errorMsg}
                    type="danger"
                    onClose={handleAlertClose}
                />
            )}

            <div className="login-container">
                <div className="welcome-container">
                    <h1 className="text-center m-0">Welcome to</h1>
                    <h2 className="text-center m-0">A-commerce</h2>
                    <p className="text-center my-4">Your trusted destination for all your shopping needs</p>

                    {/* Your existing sign-in form and other elements go here */}
                </div>

                <div className="sign-in-form">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="identifier" className="form-label">Phone Number or Email</label>
                            <input
                                type="text"
                                className="form-control"
                                id="identifier"
                                onChange={(e) => { handleChange(e.target) }}
                                placeholder="Email or Number"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
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

                    <div className="forget-password d-flex align-items-center justify-content-end mt-3">
                        <Link to={'/buyer-signin'}>
                            <h6>Forget Password?</h6>
                        </Link>
                    </div>
                </div>


                <div className="my-4 d-flex justify-content-center align-items-center">
                    <span className="mr-2 line"></span> <h4 className="text-center m-0">New To A Commerce?</h4>  <span className="ml-2 line"></span>
                </div>

                <div className="my-4 create-account d-flex justify-content-center align-items-center">
                    <button type="button" className="btn btn-success" onClick={() => { Navigate('/buyer-signup') }}>Create Account</button>
                </div>
            </div>
        </>
    );
}