import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import OrderedProduct from "../components/Products/orderedProduct"
import Cookies from "js-cookie"

export default function Orders() {

    const [userOrderedProducts, setUserOrderedProducts] = useState([])
    const [loader, setLoader] = useState(false)
    const [userId, setUserId] = useState(Cookies.get('userId'))

    const GetUserOrdersData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/get-user-orders/${userId}`);

            if (response && response.data) {
                setUserOrderedProducts(response.data.data);
                setLoader(true);
            }
        } catch (error) {
            console.error('Error fetching user cart data:', error);
            setLoader(true);
        }

    }

    useEffect(() => {
        if (userId) {
            GetUserOrdersData()
        } else {
            setLoader(true);
        }

    }, [userId])

    const refreshPage = () => {
        GetUserOrdersData()
    }

    const OrderedProducts =
        userOrderedProducts.length > 0 ? (
            userOrderedProducts.map((value, index) => (
                <OrderedProduct
                    key={index}
                    id={value.id}
                    productName={value.name}
                    productDescription={value.description}
                    price={value.price}
                    refresh={refreshPage}
                />
            )
            )) : (

            <div className="d-flex flex-column my-4">
                <i className="bi bi-emoji-frown fs-1 text-black text-center"></i>
                <h3 className="fw-bold my-2 text-center">WHY HAVEN'T YOU ORDERED ANYTHING YET?</h3>
            </div>

        )


    return (

        <div>
            {loader ? OrderedProducts : <p>loading...</p>}
        </div>
    )
}
