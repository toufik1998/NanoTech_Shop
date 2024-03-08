import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import CheckoutSteps from '../components/CheckoutSteps'

const PlaceOrderScreen = () => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress, paymentMethod, cartItems } = cart;

    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(() => {

        if(!shippingAddress.address) {
            navigate('/shipping');
        }else if(!paymentMethod){
            navigate('/payment');
        }

    }, [paymentMethod, shippingAddress.address, navigate]);


  return (
    <>
        <CheckoutSteps step1 step2 step3 step4 />
        <Row>
            <Col md={8}>colomn 8</Col>
            <Col md={4}>colomn 4</Col>
        </Row>
    </>
  )
}

export default PlaceOrderScreen