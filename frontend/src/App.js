import React from 'react'
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <>

      <Header />
      <main className='py-3'>
        <Container>
            <Routes>
              <Route path="/" exact element={<HomeScreen />} />
              <Route path="/products/:id" exact element={<ProductScreen />} />
              <Route path='/cart' exact element={<CartScreen />}/>
              <Route path='/login' exact element={<LoginScreen />}/>
              <Route path='/register' exact element={<RegisterScreen />}/>

              <Route path="/" element={<PrivateRoute />}>
                <Route path="/shipping" element={<ShippingScreen />} />
              </Route>


            </Routes>
          
        </Container>
      </main>
      <Footer />
      <ToastContainer />
      
    </>
  )
}

export default App