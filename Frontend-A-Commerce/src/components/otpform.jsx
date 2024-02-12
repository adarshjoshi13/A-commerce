import { useEffect } from "react"
import { useRef } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function OtpForm({ ApplicantData, RegisterFunc }) {
    const Navigate = useNavigate()
    const [OTP, setOTP] = useState(new Array((ApplicantData.otp).toString().length).fill(""))
    let inputRefs = useRef([])

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus()
        }
    }, [])

    function handleLogin(otp) {
        RegisterFunc(otp)
    }

    function handleChange(e, index) {

        const value = e.target.value;
        const newOTP = [...OTP]

        if (isNaN(value)) {
            return
        }

        newOTP[index] = value.slice(value.length - 1)
        setOTP(newOTP)

        const FinalOTP = newOTP.join("")
        if (FinalOTP.length == OTP.length && +FinalOTP === (ApplicantData.otp)) {
            handleLogin(FinalOTP)
        }

        if (value && index < OTP.length - 1 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus()
        }
    }

    function handleKeyDown(e, index) {

        const key = e.key
        if (key === "Backspace" && !OTP[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    }

    return (
        <>
            <div className="modal fade show d-block" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header d-flex flex-column justify-content-center">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Enter The OTP</h1>
                            <p className="m-0"> OTP have been sent to <b>{ApplicantData.applicantmail[0]} </b></p>
                        </div>
                        <div className="modal-body py-3 px-0">
                            <form>
                                <div className="my-3 d-flex">
                                    {OTP.map((value, index) => {
                                        return (
                                            <input
                                                key={index}
                                                ref={(input) => (inputRefs.current[index] = input)}
                                                type="text"
                                                className="form-control mx-2"
                                                value={value}
                                                onChange={(e) => { handleChange(e, index) }}
                                                onKeyDown={(e) => { handleKeyDown(e, index) }}
                                            />
                                        )
                                    })}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}