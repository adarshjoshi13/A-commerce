import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

const PurchasePage = () => {
    const [purchaseForm, setPurchaseForm] = useState([]);
    const [stepNumber, setStepNumber] = useState(0);
    const formRef = useRef(null);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        fullname: "",
        number: "",
        addressLine1: "",
        addressLine2: "",
        landmark: "",
        pincode: "",
        city: "",
        state: "",
        paymentMethod: ""
    });

    const getPurhcaseSteps = async () => {
        try {
            const response = await axios.get('http://localhost:3000/get-purchase-form');
            setPurchaseForm(response.data.StepsFormdata);
        } catch (error) {
            console.error("Error fetching purchase form:", error);
        }
    };

    useEffect(() => {
        getPurhcaseSteps();
    }, []);

    useEffect(() => {
        if (formRef.current) {
            formRef.current.addEventListener("submit", handleFormSubmit);
            formRef.current.addEventListener("change", handleInputChange);
        }

        return () => {
            if (formRef.current) {
                formRef.current.removeEventListener("submit", handleFormSubmit);
                formRef.current.removeEventListener("change", handleInputChange);
            }
        };
    }, [purchaseForm]);

    useEffect(() => {
        if (formSubmitted) {
            console.log("Form Data:", formData);

            if (stepNumber === 1) {
                const userConfirmed = window.confirm("Do you really want to confirm the order?");
    
                if (userConfirmed) {
                    console.log("Order confirmed!");
                } else {
                    setFormSubmitted(false)
                    return
                }
            }

            setStepNumber((prevStepNumber) => prevStepNumber + 1);
            setFormSubmitted(false);
        }
    }, [formData, formSubmitted]);

    function handleFormSubmit(e) {
        e.preventDefault();

        console.log("Form submitted");
        setFormSubmitted(true);
    }

    function handleInputChange(e) {
        const { name, value } = e.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }
    return (
        <>
            <div className="container my-5">
                <div className="stepper-container">
                    {purchaseForm.map((value, index) => (
                        <div key={index} className={`stepper-step col-4`}>
                            <div className={value.stepNumber <= stepNumber ? 'line active' : 'line'} />
                            <h4 className="step-number">{value.stepNumber}</h4>
                            <h5 className="step-name">{value.stepName}</h5>
                        </div>
                    ))}
                </div>

                <div className="step-form">
                    {purchaseForm.length > 0 && (
                        <div dangerouslySetInnerHTML={{ __html: purchaseForm[stepNumber].stepForm }} ref={formRef} />
                    )}
                </div>
            </div>
        </>
    );
};

export default PurchasePage;
