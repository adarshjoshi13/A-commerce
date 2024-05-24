import React from 'react'

export default function Dashboard(prop) {


    return (
        <div className='col-md-10 py-5  controller'>
          <div className='dashboard'>
            <h1>Dashboard</h1>
            <div className="card-deck d-flex flex-row">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Total Products</h5>
                  <p className="card-text">{prop.SellerInfo.products.length}</p>
                </div>
              </div>
              <div className="card mx-2">
                <div className="card-body">
                  <h5 className="card-title">Total Orders</h5>
                  <p className="card-text">{prop.SellerInfo.orders.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    
}
