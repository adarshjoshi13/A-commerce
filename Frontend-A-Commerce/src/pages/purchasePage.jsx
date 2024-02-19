import { useParams } from "react-router-dom"

const PurchasePage = () => {

    const Params = useParams()
    console.log(Params.productId)
}

export default PurchasePage