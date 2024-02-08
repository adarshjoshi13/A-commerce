import { Link } from "react-router-dom"



const Product = (props) => {
    return (
        <>
            <div id={props.id} className="product-box p-3 d-flex flex-column justify-content-center align-content-center m-2 my-5">
                <h1>{props.productName}</h1>
                <p>{props.productDescription}</p>
                <p>{props.price}</p>

                <Link to={`/product-page/${props.id}`}><button type="btn" className="btn-primary btn">Purchase</button></Link>
            </div>
        </>
    )
}

export default Product