import React, { useState } from 'react';
import axios from 'axios';
import Alert from '../alert'
import { Link, useNavigate } from 'react-router-dom';

export default function BuyerSignUp() {
    const Navigate = useNavigate()
    const [Msg, setMsg] = useState()
    const [showAlert, setShowAlert] = useState();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        Cpassword: '',
    });


    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            if (formData.password !== formData.Cpassword) {
                throw "Password Mismatch"
            } else {
                const response = await axios.post('http://localhost:3000/seller-sign-up ', { ...formData }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                setShowAlert(true)
                setMsg(response.data.msg)
            }


        } catch (error) {
            e.preventDefault()
            setShowAlert(true)
            setMsg(error)
        }
    };

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

            <div className='d-flex justify-content-center align-items-center my-5'>
                <div className="signup-container ">
                    <div className="signup-form">
                        <h2 className="text-center mb-4">Create Your <span className='text-warning'>Seller</span> Account</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label fw-bold">Full Name</label>
                                <input type="text" className="form-control" id="name" onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label fw-bold">Email address</label>
                                <input type="email" className="form-control" id="email" onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label fw-bold">Password</label>
                                <input type="password" className="form-control" id="password" onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Cpassword" className="form-label fw-bold">Confirm Password</label>
                                <input type="password" className="form-control" id="Cpassword" onChange={handleChange} required />
                            </div>
                            <button type="submit" className="btn btn-primary">Create Account</button>
                        </form>
                    </div>

                    <div className='already-have-account mt-3'>
                        <p className='text-center text-black'>Already A Seller Here?
                            <Link to={'/seller-signin'}>
                                Sign In
                            </Link>
                        </p>
                    </div>

                </div>
            </div>

        </>
    );

};