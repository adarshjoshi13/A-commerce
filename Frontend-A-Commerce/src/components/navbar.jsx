import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const Navigate = useNavigate()
    const storedToken = localStorage.getItem('token');
    const handleLogout = () => {
        localStorage.clear();
        Navigate('/')
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand fw-bold">HOME</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        </ul>

                        <div className='mx-3 d-flex justify-content-center align-items-center flex-nowrap'>
                            <li className='list-unstyled'>
                                <Link to="/my-cart" ><i className="bi bi-cart-fill text-black fs-4"></i></Link>
                            </li>
                        </div>

                        {storedToken ?
                            <li className="nav-item  list-unstyled mx-2" onClick={handleLogout}>
                                <Link to="/my-cart" className="nav-link fw-bold" aria-expanded="false">
                                    Log Out
                                </Link>
                            </li> :
                            <li className="nav-item dropdown list-unstyled mx-2">

                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Account
                                </a>
                                <ul className="dropdown-menu">
                                    <Link to='/login' className="dropdown-item">Log In</Link>
                                    <li><hr className="dropdown-divider" /></li>
                                    <Link to='/signup' className="dropdown-item">Sign Up</Link>
                                </ul>
                            </li>}


                    </div>
                </div>
            </nav>
        </>
    )
}