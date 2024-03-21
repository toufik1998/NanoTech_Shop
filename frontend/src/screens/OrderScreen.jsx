import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { PayPalButtons, usePayPalScriptReducer, FUNDING, PayPalMarks} from '@paypal/react-paypal-js';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useGetOrderDetailsQuery, usePayOrderMutation, useGetPaypalClientIdQuery, useDeliverOrderMutation } from '../slices/orderApiSlice';

import React from 'react'

const OrderScreen = () => {

    const { id: orderId } = useParams();
    const { data, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);

    const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  
    const { data: paypall, error: errorPayPal, isLoading: loadingPayPal } = useGetPaypalClientIdQuery();

    const [deliverOrder, { isLoading: loadingDeliverOrder }] = useDeliverOrderMutation();

    const [{ isPending, isRejected, isFulfilled }, paypalDispatch] = usePayPalScriptReducer();

    const { userInfo } = useSelector((state) => state.auth);
    
    useEffect(() => {
        if(!errorPayPal && !loadingPayPal && paypall.clientId) {
            const loadPayPalScript = async () => {
                paypalDispatch({ 
                    type: 'resetOptions',
                    value: {
                        'client-id': paypall.clientId,
                        currency: 'USD',
                    } 
                });
                paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
            }
        
            if(data && !data.isPaid) {
                if(!window.paypal) {
                    loadPayPalScript();
                }
            }
        }

    }, [data, paypall, errorPayPal, loadingPayPal, paypalDispatch]);

    function onApprove (data, actions) {
        return actions.order.capture().then(async function(details) {
            try {
                await payOrder({ orderId, details });
                refetch();
                toast.success('Payment successful')
            } catch (error) {
                toast.error(error?.data?.message || error.message);
            }
        });
    }
    async function onApproveTest () {
         await payOrder({ orderId, details: { payer: {} } });
        refetch();
        toast.success('Payment successful')
    }

    function onError (err) {
        toast.error(err.message);
    }

    function createOrder (dataa, actions) {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: data.totalPrice,
                    },
                },
            ],
        }).then((orderID) => {
            return orderID;
        })
    }

    const deliverOrderHandler = async () => {
        try {
            await deliverOrder(orderId);
            refetch();
            toast.success('Order delivered');
        } catch (error) {
            toast.error(error?.data?.message || error.message);
        }
    }

  
    return isLoading ? <Loader /> : error ? <Message variant='danger'>{error?.data?.message || error.error}</Message> : (
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
                        {!data.isPaid && (
                            <ListGroup.Item>
                                {loadingPay && <Loader />}

                                {isPending ? <Loader /> : (
                                    <div>
                                        {/* <Button onClick={onApproveTest} style={{marginBottom: '10px'}}>Test Pay order</Button> */}
                                        <div>
                                            <PayPalButtons 
                                                style={{ layout: 'horizontal' }} 
                                                fundingSource={FUNDING.PAYPAL}

                                                createOrder={createOrder} 
                                                onApprove={onApprove}
                                                onError={onError}
                                                
                                            />

                                            <PayPalButtons
                                                style={{ layout: 'horizontal' }}
                                                fundingSource={FUNDING.CARD}
                                                createOrder={createOrder}
                                                onApprove={onApprove}
                                                onError={onError}
                                            />
                                        </div>
                                    </div>
                                )}
                            </ListGroup.Item>
                        )}

                        {loadingDeliverOrder && <Loader />}

                        {userInfo && userInfo.isAdmin && data.isPaid && !data.isDelivered && (
                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn btn-block'
                                    onClick={deliverOrderHandler}
                                >
                                    Mark As Delivered
                                </Button>
                            </ListGroup.Item>
                        
                        )}
                    </ListGroup>
                    </Card>
                </Col> 
            </Row>       
        </>    
    );
    
  
}

export default OrderScreen