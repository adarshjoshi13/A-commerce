import { Link } from "react-router-dom"

export default function CartProducts() {
    return (
        <div className="product-box p-3 d-flex flex-column justify-content-center align-content-center m-2 my-5">
        <h1>productName</h1>
        <p>productDescription</p>
        <p>$10</p>
        <Link to={`/product-page`}><button type="btn" className="btn-primary btn">Purchase</button></Link>
    </div>
    )
}
