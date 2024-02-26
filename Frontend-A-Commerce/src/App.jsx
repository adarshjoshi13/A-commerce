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
import Orders from './pages/ordersPage'
import SearchResultPage from './pages/searchResultPage'
import FilterResultPage from './pages/filterResultPage'

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
          <Route path='/my-orders' element={<Orders />} />
          <Route path='/product-purchase/:productId' element={<PurchasePage />} />
          <Route path='/search-results/:searchedKey' element={<SearchResultPage />} />
          <Route path='/filter-results/:searchedKey/:sort' element={<FilterResultPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App