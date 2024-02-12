import Navbar from './components/navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import ProductPage from './pages/productPage'
import SignUpPage from './pages/signUpPage'
import LoginPage from './pages/loginPage'

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product-page/:id' element={<ProductPage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App