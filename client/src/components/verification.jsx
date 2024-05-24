import axios from 'axios'
import Alert from './alert'
import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function Verification() {
    const Navigate = useNavigate()
    const Params = useParams()

    const [ShowRedirection, setShowRedirection] = useState(false)
    const Token = Params.verificationToken
    const [Msg, setMsg] = useState()
    const [showAlert, setShowAlert] = useState();

    const VerifySeller = async (VerificationToken) => {

        console.log("run")

        const response = await axios.put(`http://localhost:3000/verify-seller/${VerificationToken}`)

        if (response.data.success) {
            setMsg(response.data.msg)
            setShowAlert(true)
            setShowRedirection(true)
        } else {
            console.log("Seller is not verified")
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

            <div className='col-6 my-5 py-5 d-flex flex-column justify-content-center'>
                <h1 className='text-center'>Verify Your Account</h1>
                <div className='d-flex justify-content-center'>
                    <button type='button' className='btn btn-danger' onClick={() => { VerifySeller(Token) }}>Verify Account</button>
                </div>

                {ShowRedirection && (
                    <p className='text-center my-3'>Go To <Link to={'/seller-signin'} >Sign In</Link> Page</p>
                )}

            </div>
        </>
    )
}
