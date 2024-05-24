import { Link } from "react-router-dom";

export default function Product(props) {
  
  let limitWords = 25
  const truncateDescription = (description) => {
    const words = description.split(' ');
    if (words.length > limitWords) {
      return words.slice(0, limitWords).join(' ') + '...';
    }
    return description;
  };


  return (
    <div className="card product-box col-3">
      <div className="image-container">
        <img
          src={props.img}
          className="card-img-top img-fluid"
          alt={`${props.productName} Image`}
        />
      </div>
      <div className="card-body">
        <h5 className="card-title">{props.productName}</h5>
        <p className="card-text">{truncateDescription(props.productDescription)}</p>
        <h4 className="card-text">₹{props.price}</h4>
        <Link to={`/product-page/${props.productName}/${props.id}`} className="btn btn-primary">
          Purchase
        </Link>
      </div>
    </div>
  );
}
