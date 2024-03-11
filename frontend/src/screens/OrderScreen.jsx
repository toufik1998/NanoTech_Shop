import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useGetOrderDetailsQuery } from '../slices/orderApiSlice';

import React from 'react'

const OrderScreen = () => {

    const { id: orderId } = useParams();
    const { data, isLoading, error } = useGetOrderDetailsQuery(orderId);
  
    console.log(data);
  
    return isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <>
            <h1>Order {data._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                        <strong>Name: </strong> {data.user.name}
                        </p>
                        <p>
                        <strong>Email: </strong>{' '}
                        <a href={`mailto:${data.user.email}`}>{data.user.email}</a>
                        </p>
                        <p>
                        <strong>Address:</strong>
                        {data.shippingAddress.address}, {data.shippingAddress.city}{' '}
                        {data.shippingAddress.postalCode},{' '}
                        {data.shippingAddress.country}
                        </p>
                        {data.isDelivered ? (
                        <Message variant='success'>
                            Delivered on {data.deliveredAt}
                        </Message>
                        ) : (
                        <Message variant='danger'>Not Delivered</Message>
                        )}
                    </ListGroup.Item>
        
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                        <strong>Method: </strong>
                        {data.paymentMethod}
                        </p>
                        {data.isPaid ? (
                        <Message variant='success'>Paid on {data.paidAt}</Message>
                        ) : (
                        <Message variant='danger'>Not Paid</Message>
                        )}
                    </ListGroup.Item>
        
                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {data.orderItems.length === 0 ? (
                        <Message>Order is empty</Message>
                        ) : (
                        <ListGroup variant='flush'>
                            {data.orderItems.map((item, index) => (
                            <ListGroup.Item key={index}>
                                <Row>
                                <Col md={1}>
                                    <Image
                                    src={item.image}
                                    alt={item.name}
                                    fluid
                                    rounded
                                    />
                                </Col>
                                <Col>
                                    <Link to={`/product/${item.product}`}>
                                    {item.name}
                                    </Link>
                                </Col>
                                <Col md={4}>
                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                </Col>
                                </Row>
                            </ListGroup.Item>
                            ))}
                        </ListGroup>
                        )}
                    </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                        <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <Row>
                            <Col>Items</Col>
                            <Col>${data.itemsPrice}</Col>
                        </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <Row>
                            <Col>Shipping</Col>
                            <Col>${data.shippingPrice}</Col>
                        </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <Row>
                            <Col>Tax</Col>
                            <Col>${data.taxPrice}</Col>
                        </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <Row>
                            <Col>Total</Col>
                            <Col>${data.totalPrice}</Col>
                        </Row>
                        </ListGroup.Item>
                    </ListGroup>
                    </Card>
                </Col> 
            </Row>       
        </>    
    );
    
  
}

export default OrderScreen