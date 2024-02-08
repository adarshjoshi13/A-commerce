import React, { useState } from 'react';
import axios from 'axios';
import Alert from './alert'
import OtpForm from './otpform'
const SignUp = () => {

  const [alert, setAlert] = useState()
  const [OTP, setOTP] = useState("")
  const [formData, setFormData] = useState({
    name: '',
    number: '',
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

          setOTP(response.data.otp)
        }
      }

    } catch (error) {
      e.preventDefault()
      setAlert(error)
    }
  };
  console.log(OTP)
  return (
    <>
      <OtpForm />
      <Alert
        message={alert}
      />


      <div className="container my-5">
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
    </>
  );
};

export default SignUp;
