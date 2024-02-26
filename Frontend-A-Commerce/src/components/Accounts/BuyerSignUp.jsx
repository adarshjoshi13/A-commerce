import React, { useState } from 'react';
import axios from 'axios';
import Alert from '../alert'
import OtpForm from '../otpform'
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const Navigate = useNavigate()
  const [alert, setAlert] = useState()
  const [ApplicantData, setApplicantData] = useState({})
  const [FormVisbile, setFormVisbile] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: '',
    password: '',
    Cpassword: '',
  });

  const Register = async (otp) => {

    const response = await axios.post('http://localhost:3000/register', { ...formData, OTP: otp }, {
      headers: {
        "Content-Type": "application/json"
      }
    })

    Navigate('/login')


  }


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
      if (formData.number.length !== 10) {
        throw "Invalid Number"
      } else {
        if (formData.password !== formData.Cpassword) {
          throw "Password Mismatch"
        } else {
          const response = await axios.post("http://localhost:3000/authentication", formData, {
            headers: {
              "Content-Type": "application/json"
            }
          });

          setApplicantData(response.data)
          setFormVisbile(false)
        }
      }

    } catch (error) {
      e.preventDefault()
      setAlert(error)
    }
  };

  return (
    <>
      <Alert message={alert} />

      {FormVisbile ? (
        <div className="signup-container ">
          <div className="signup-form">
            <h2 className="text-center mb-4">Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label fw-bold">Full Name</label>
                <input type="text" className="form-control" id="name" onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="number" className="form-label fw-bold">Phone Number</label>
                <input type="number" className="form-control" id="number" onChange={handleChange} required />
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
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      ) : (
        <OtpForm
          ApplicantData={ApplicantData}
          RegisterFunc={Register}
        />
      )}
    </>
  );

};