import React from 'react'
import { Route, Routes, Navigate } from "react-router-dom";
import Header from './components/Header'
import Footer from './components/Footer'
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

const App = () => {
  return (
    <>

      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path="/" exact element={<HomeScreen />} />
            <Route path="/products/:id" exact element={<ProductScreen />} />


          </Routes>
        </Container>
      </main>
      <Footer />

    </>
  )
}

export default App