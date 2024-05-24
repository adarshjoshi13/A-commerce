import React, { useEffect, useState } from 'react'
import Sidebar from '../components/DashboardComponents/siderbar';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function SellerDashboardPage({ children }) {
    const Navigate = useNavigate()
    const [SellerInfo, setSellerInfo] = useState()
    const cookies = Cookies.get()
    const SellerId = cookies.SellerId

    const childrenWithProps = React.Children.map(children, (child) => {
        return React.cloneElement(child, { ...SellerInfo });
    });


    const GetSellerInfo = async () => {
        const response = await axios.get(`http://localhost:3000/get-seller-info/${SellerId}`)

        if (response.data.success) {
            setSellerInfo(response.data.data)
        } else {
            console.log(response)
        }
    }

    useEffect(() => {
        if (!SellerId) {
            Navigate('/seller-signin')
        }
        GetSellerInfo()
    }, [])

    return (
        <div className='container-fluid'>
            <div className='row'>
                {SellerId ? (
                    SellerInfo ? (
                        <>
                            <Sidebar />
                            {childrenWithProps}
                        </>
                    ) : <p>Loading...</p>
                ) : null}
            </div>
        </div>
    );
}

export default SellerDashboardPage



// {SellerInfo ? (
//     <>
//         <Sidebar />
//         <AddProduct
//             categories={SellerInfo.categories}
//         />
//     </>
// ) : (<p>
//     Loading...
// </p>)}