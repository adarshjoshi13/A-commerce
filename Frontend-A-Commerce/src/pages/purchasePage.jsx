import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const PurchasePage = () => {

    const [PurhcaseForm, setPurchaseForm] = useState([])

    const GetPurhcaseSteps = async () => {
        const PurchaseForm = await axios.get('http://localhost:3000/get-purchase-form')

        if (PurchaseForm) {
            setPurchaseForm(PurchaseForm.data.StepsFormdata)
        }
    }

    const Params = useParams()
    useEffect(() => {
        GetPurhcaseSteps()
    }, [])

    return (
        <>
            <div className="container my-5">
            {PurhcaseForm[0].stepForm.Html}
            </div>

        </>
    )
}

export default PurchasePage