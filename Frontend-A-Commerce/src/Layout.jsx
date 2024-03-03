import { useEffect } from 'react';
import Navbar from './components/navbar'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export default function Layout({ children }) {
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

            {SellerId ? null :
                (
                    <>
                        <Navbar />
                        {children}
                    </>
                )}
        </>
    );
}