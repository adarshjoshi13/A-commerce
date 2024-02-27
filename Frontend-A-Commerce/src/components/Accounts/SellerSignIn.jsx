import axios from "axios"
import { useState } from "react"
import Cookies from "js-cookie"
import { Link, useNavigate } from "react-router-dom"

export default function SellerSignIn() {
    const Navigate = useNavigate()
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
        try {
            e.preventDefault()
            const response = await axios.post('http://localhost:3000/seller-sign-up', FormData, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            })
            if (response) {
                let userId = response.data.data.userData.id
                let token = response.data.data.userToken
                localStorage.setItem('token', token);
                Cookies.set('userId', userId, { secure: true, expires: 7, sameSite: 'Strict' });
                window.location.replace('/');

            }
        } catch (err) {
            console.log("ERROR FOUND: ", err)
        }
    }

    return (
        <div className="login-container">
            <div className="welcome-container">
                <h1 className="text-center mb-4">Greetings, Sellers!</h1>
                <p className="text-center mb-4">Ready to sell your good in the vibrant marketplace.</p>
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
    );

}