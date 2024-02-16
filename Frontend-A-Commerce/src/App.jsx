import Navbar from './components/navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/homePage'
import ProductPage from './pages/productpage'
import SignUpPage from './pages/signUpPage'
import LoginPage from './pages/loginPage'
import CartPage from './pages/cartPage'
import WishlistPage from './pages/wishlistPage'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/product-page/:id' element={<ProductPage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/my-cart' element={<CartPage />} />
          <Route path='/my-wishlist' element={<WishlistPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App