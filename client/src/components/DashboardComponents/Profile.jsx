import React from 'react'

export default function Profile(props) {
    const seller = props.SellerInfo
    return (
        <div className="col-md-8 d-flex justify-content-end align-items-center px-5">
            <div className="card col-md-8 shadow">
                <div className="card-body">
                    <h1 className="card-title text-center">Profile</h1>
                    <hr />
                    <div className="text-center">
                        <img src="https://via.placeholder.com/150" className="rounded-circle" alt="Profile" />
                    </div>
                    <div className="text-center mt-3">
                        <h3>{seller.full_name}</h3>
                        <p>{seller.email}</p>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-6">
                            <p><strong>Created At:</strong> {seller.createdAt}</p>
                        </div>
                        <div className="col-6">
                            <p><strong>ID:</strong> {seller.id}</p>
                        </div>
                    </div>
                    {/* Add more fields as needed */}
                </div>
            </div>
        </div>
    )
}
