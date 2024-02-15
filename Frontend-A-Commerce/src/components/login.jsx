import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../utilis/Auth"

export default function Login() {
    const { UserVerification } = useAuth()
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
            const response = await axios.post('http://localhost:3000/login', FormData, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            })
            if (response) {
                let userId = response.data.data.userData.id
                let token = response.data.data.userToken
                const VerifiedUserId = await UserVerification(userId)
                if(VerifiedUserId){
                    localStorage.setItem('token', token)
                    Navigate('/')
                }
            }
        } catch (err) {
            console.log("ERROR FOUND: ", err)
        }
    }

    return (

        <>
            <div className="container">
                <h1>Welcome To A-commerce </h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Phone Number</label>
                        <input type="text" className="form-control" id="identifier" aria-describedby="emailHelp" onChange={(e) => { handleChange(e.target) }} placeholder="Email Or Number" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" onChange={(e) => { handleChange(e.target) }} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}