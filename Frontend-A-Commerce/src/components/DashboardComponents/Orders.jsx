import React from 'react';

export default function Orders(props) {
    const orders = props.orders;

    return (
        <div className="col-md-10 py-5 controller">
            <div className="orders">
                <h1 className="mb-4">Orders</h1>
                {orders.map((order) => (
                    <div key={order.id} className="card d-flex flex-row mx-4">
                        <div className="card-body">
                            <h5 className="card-title">Order ID: {order.id}</h5>
                            <p className="card-text">
                                <strong>Order By:</strong> {order.deliveryInfo.fullname}
                            </p>
                            <p className="card-text">
                                <strong>Customer Number:</strong> {order.deliveryInfo.number}
                            </p>
                            <p className="card-text">
                                <strong>Order At:</strong> {new Date(order.createdAt).toLocaleString()}
                            </p>
                        </div>
                        <div className='orderedProduct mx-2 d-flex flex-column justify-content-center align-items-center'>
                            <h4>Ordered Product</h4>
                            <h1 className='fs-1'>{order.orderedProduct}</h1>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
