import Data from '../Data'
import Product from '../components/product'

const Home = () => {

    const products = Data.map((value, index) => {
        return (
            <Product
                key={index}
                id={value.productId}
                productName={value.productName}
                productDescription={value.productDescription}
                price={value.price}
            />
        )
    })

    return (
        <>
            <div className='d-flex flex-row justify-content-evenly flex-wrap'>
                {products}
            </div>
        </>
    )
}

export default Home 