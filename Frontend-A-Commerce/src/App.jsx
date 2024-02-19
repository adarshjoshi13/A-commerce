import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar'
import HomePage from './pages/homePage'
import AllProducts from './pages/allProductPage'
import ProductPage from './pages/productpage'
import SignUpPage from './pages/signUpPage'
import LoginPage from './pages/loginPage'
import CartPage from './pages/cartPage'
import WishlistPage from './pages/wishlistPage'
import PurchasePage from './pages/purchasePage'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/products/:catId' element={<AllProducts />} />
          <Route path='/product-page/:procut-name/:id' element={<ProductPage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/my-cart' element={<CartPage />} />
          <Route path='/my-wishlist' element={<WishlistPage />} />
          <Route path='/product-purhchase/:productId' element={<PurchasePage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App