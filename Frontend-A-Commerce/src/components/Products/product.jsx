import { Link } from "react-router-dom"

export default function Product(props) {
    return (
        <div className="card product-box col-3">
          <img src={`./public/${props.id}.png`} className="card-img-top" alt={`${props.productName} Image`} />
          <div className="card-body">
            <h5 className="card-title">{props.productName}</h5>
            <p className="card-text">{props.productDescription}</p>
            <p className="card-text">₹{props.price}</p>
            <Link to={`/product-page/${props.productName}/${props.id}`} className="btn btn-primary">
              Purchase
            </Link>
          </div>
        </div>
      );    
    
}