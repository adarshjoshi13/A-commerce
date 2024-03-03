import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/homePage'
import AllProducts from './pages/allProductPage'
import ProductPage from './pages/productpage'
import BuyerSignInPage from './pages/AccountPages/buyerSignInPage'
import BuyerSignUpPage from './pages/AccountPages/buyerSignUpPage'
import SellerSignInPage from './pages/AccountPages/sellerSignInPage'
import SellerSignUpPage from './pages/AccountPages/sellerSignUpPage'
import VerificationPage from './pages/verificationPage'
import CartPage from './pages/cartPage'
import WishlistPage from './pages/wishlistPage'
import PurchasePage from './pages/purchasePage'
import MyOrders from './pages/ordersPage'
import SearchResultPage from './pages/searchResultPage'
import FilterResultPage from './pages/filterResultPage'
import SellerDashboardPage from './pages/SellerDashboardPage'
import Layout from './Layout'
import Dashboard from './components/DashboardComponents/Dashboard'
import Products from './components/DashboardComponents/Products'
import Orders from './components/DashboardComponents/Orders'
import Profile from './components/DashboardComponents/Profile';


function App() {
  return (
    <>
      <Router>
        <Routes>

          <Route path='/' element={<Layout><HomePage /></Layout>} />
          <Route path='/buyer-signin' element={<BuyerSignInPage />} />
          <Route path='/buyer-signup' element={<BuyerSignUpPage />} />
          <Route path='/seller-signin' element={<SellerSignInPage />} />
          <Route path='/seller-signup' element={<SellerSignUpPage />} />
          <Route path='/products/:catId' element={<Layout><AllProducts /></Layout>} />
          <Route path='/product-page/:procut-name/:id' element={<Layout><ProductPage /></Layout>} />
          <Route path='/product-purchase/:productId/:sellerId' element={<Layout><PurchasePage /></Layout>} />
          <Route path='/my-cart' element={<Layout><CartPage /></Layout>} />
          <Route path='/my-wishlist' element={<Layout><WishlistPage /></Layout>} />
          <Route path='/my-orders' element={<Layout><MyOrders /></Layout>} />
          <Route path='/search-results/:searchedKey' element={<Layout><SearchResultPage /></Layout>}/>
          <Route path='/filter-results/:searchedKey/:sort' element={<Layout><FilterResultPage /></Layout>} />
          <Route path='/verify-account/:verificationToken' element={<VerificationPage />} />
          <Route path='/dashboard' element={<SellerDashboardPage><Dashboard /></SellerDashboardPage>} />
          <Route path='/dashboard/products' element={<SellerDashboardPage><Products /></SellerDashboardPage>} />
          <Route path='/dashboard/orders' element={<SellerDashboardPage><Orders /></SellerDashboardPage>} />
          <Route path='/dashboard/profile' element={<SellerDashboardPage><Profile /></SellerDashboardPage>} />
        </Routes>
      </Router>
    </>
  );
}


export default App