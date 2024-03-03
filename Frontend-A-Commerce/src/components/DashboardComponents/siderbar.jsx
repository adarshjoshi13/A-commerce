import React from 'react'
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

export default function Sidebar() {

  function LogOut() {
    Cookies.remove('SellerId');
    window.location.replace('/');
  }

  return (
    <div className='col-md-2 sidebar bg-dark text-light'>
      <h1 className='text-center my-4'>My Dashboard</h1>
      <ul className='list-unstyled'>
        <li>
          <Link to={'/dashboard'} className='text-decoration-none text-white'>
            <i className='bi bi-house-door'></i> Dashboard
          </Link>
        </li>
        <li>
          <Link to={'/dashboard/products'} className='text-decoration-none text-white'>
            <i className='bi bi-box'></i> Products
          </Link>
        </li>
        <li>
          <Link to={'/dashboard/orders'} className='text-decoration-none text-white'>
            <i className='bi bi-cart'></i> Orders
          </Link>
        </li>
        <li>
          <Link to={'/dashboard/profile'} className='text-decoration-none text-white'>
            <i className='bi bi-person'></i> Profile

          </Link>
        </li>
        <li>
          <button type="button" className="btn btn-danger" onClick={LogOut}><i className="bi bi-box-arrow-right"></i> Log Out </button>
        </li>
      </ul>
    </div>
  );


}
