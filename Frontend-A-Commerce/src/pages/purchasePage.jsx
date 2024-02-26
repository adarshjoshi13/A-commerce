import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PurchasePage = () => {
    const Navigate = useNavigate()
    const cookie = Cookies.get()

    const [purchaseForm, setPurchaseForm] = useState([]);
    const [stepNumber, setStepNumber] = useState(0);
    const formRef = useRef(null);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const Params = useParams()
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
        if (!cookie.userId) {
            Navigate('/login');
        }

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

    useEffect(() => {

        if (purchaseForm.length > 0) {
            if (stepNumber + 1 === purchaseForm.length) {
                console.log(formData)
                const ListOrder = async () => {
                    try {
                        const ListProductOrder = await axios.post('http://localhost:3000/list-product-order', { ...userId, ...Params, ...formData }, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })

                        if (ListProductOrder) {
                            console.log("order list successfully")
                        }
                    } catch (Err) {
                        console.log("Error found while listing order", Err)
                    }
                }

                ListOrder()
            }
        }
    }, [stepNumber])

    function handleFormSubmit(e) {
        e.preventDefault();
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
                            <div className={value.stepNumber <= stepNumber + 1 ? 'line active' : 'line'} />
                            <h4 className="step-number">{value.id}</h4>
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
