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
                    <a className="navbar-brand fw-bold" href="/">HOME</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Account</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                            </li>
                        </ul>

                        {storedToken ?
                            <li className="nav-item  list-unstyled mx-2" onClick={handleLogout}>
                                <a className="nav-link fw-bold " href="#" aria-expanded="false">
                                    Log Out
                                </a>
                            </li> :
                            <li className="nav-item dropdown list-unstyled mx-2">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Account
                                </a>
                                <ul className="dropdown-menu">
                                    <Link to='/login'><a className="dropdown-item">Log In</a></Link>
                                    <li><hr className="dropdown-divider" /></li>
                                    <Link to='/signup'><a className="dropdown-item">Sign Up</a></Link>
                                </ul>
                            </li>}


                    </div>
                </div>
            </nav>
        </>
    )
}