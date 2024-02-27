import axios from "axios"
import { useState } from "react"
import Cookies from "js-cookie"
import { Link, useNavigate } from "react-router-dom"

export default function BuyerSignIn() {
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
            const response = await axios.post('http://localhost:3000/buyer-sign-in', FormData, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            })
            if (response) {
                let BuyerId = response.data.data.userData.id
                let token = response.data.data.userToken
                localStorage.setItem('token', token);
                console.log(BuyerId)
                Cookies.set('BuyerId', BuyerId, { secure: true, expires: 7, sameSite: 'Strict' });
                window.location.replace('/');

            }
        } catch (err) {
            console.log("ERROR FOUND: ", err)
        }
    }

    return (
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
    );

}