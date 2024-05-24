import { useEffect } from 'react'
import BuyerSignUp from '../../components/Accounts/BuyerSignUp'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const BuyerSignUpPage = () => {
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
            <BuyerSignUp />
        </>
    )
}

export default BuyerSignUpPage