import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import SearchBar from './searchBar'
export default function Navbar() {
    // const storedToken = localStorage.getItem('token');
    const cookies = Cookies.get()
    const BuyerId = cookies.BuyerId

    const handleLogout = () => {
        Cookies.remove('BuyerId');
        localStorage.clear();
        window.location.replace('/');
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid" id="nav-container">
                    <Link to="/" className="navbar-brand fw-bold">HOME</Link>
                    <SearchBar />
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        </ul>

                        <div className='mx-3 d-flex justify-content-center align-items-center flex-nowrap'>


                            {BuyerId ?
                                (
                                    <>
                                        <li className='list-unstyled mx-2'>
                                            <Link to="/my-cart" ><i className="bi bi-cart-fill text-black fs-4"></i></Link>
                                        </li>

                                        <li className='list-unstyled mx-2 '>
                                            <Link to="/my-wishlist"><i className="bi bi-heart-fill text-black fs-4"></i></Link>
                                        </li>
                                    </>
                                )
                                :
                                null}

                        </div>

                        {BuyerId ?
                            <li className="nav-item dropdown list-unstyled mx-2">
                                <a className="nav-link dropdown-toggle fw-bold" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    My Profile
                                </a>
                                <ul className="dropdown-menu">
                                    <Link to='/my-orders' className="dropdown-item">My Orders</Link>
                                    <li><hr className="dropdown-divider" /></li>
                                    <Link className="dropdown-item fw-bold" onClick={handleLogout}>Log Out <i className="bi bi-box-arrow-right fw-bold fs-5"></i></Link>
                                </ul>
                            </li>
                            :

                            <li className="nav-item dropdown list-unstyled mx-2">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Account
                                </a>
                                <ul className="dropdown-menu">
                                    <Link to='/buyer-signin' className="dropdown-item">Want To Buy</Link>
                                    <li><hr className="dropdown-divider" /></li>
                                    <Link to='/seller-signin' className="dropdown-item">Want To Sell</Link>
                                </ul>
                            </li>}


                    </div>
                </div>
            </nav>
        </>
    )
}