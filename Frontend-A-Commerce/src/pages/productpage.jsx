import { useParams } from 'react-router-dom'
import Data from '../Data'
import Product from '../components/product'



const ProductPage = () => {

    const id = useParams();

    const products = Data.map((value, index) => {
        if (value.productId === +id.id) {
            return (
                <Product
                    key={index}
                    id={value.productId}
                    productName={value.productName}
                    productDescription={value.productDescription}
                    price={value.price}
                />
            )
        }
    })
    console.log({ products })

    return (
        <>
            <div className='d-flex flex-row justify-content-evenly flex-wrap'>
                {products}
            </div>
        </>
    )
}

export default ProductPage 