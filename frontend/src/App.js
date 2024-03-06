import React from 'react'
import { Route, Routes } from "react-router-dom";
import Header from './components/Header'
import Footer from './components/Footer'
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';

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
          </Routes>
        </Container>
      </main>
      <Footer />

    </>
  )
}

export default App