import { useEffect } from 'react'
import BuyerSignIn from '../../components/Accounts/BuyerSignIn'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const BuyerSignInPage = () => {
    const Navigate = useNavigate()
    const cookies = Cookies.get()
    const SellerId = cookies.SellerId

    useEffect(() => {
        if (SellerId) {
            Navigate('/dashboard')
        }
    }, [])

    return (
        <>
            <BuyerSignIn />
        </>
    )
}

export default BuyerSignInPage